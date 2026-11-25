import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useUser } from "@/context/UserContext";
import User from "@/type/User";
import { editDataFromLocal, getDataFromLocal } from "@/utils/functions";
import {
  legacyImport,
  teacherLogin,
  type LegacyImportResult,
  type LegacySkipRow,
} from "@/utils/geosApiBridge";
import {
  formatMigrationDate,
  isLevelCheckReady,
  isSprReady,
  listLevelCheckRows,
  listSprRows,
  migrationDocKey,
  missingLevelCheckFields,
  missingSprFields,
  parseCampus,
  type LevelCheckMigrationRow,
  type MigrationCampus,
  type MigrationDocKind,
  type SprMigrationRow,
} from "@/utils/migrationReadiness";
import labelText from "@/assets/other/labelText.json";

type MigrationText = (typeof labelText)["english"]["migration"];

/** Fills {name} placeholders in a translated string. */
const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));

type WizardStep = "campus" | "validate" | "review" | "login" | "done";

const CAMPUS_OPTIONS: MigrationCampus[] = ["CH", "TM"];

const formatSkipRow = (row: LegacySkipRow) => {
  const name = row.name?.trim() || "—";
  const date = row.date?.trim() || "—";
  const reason = row.reason?.trim();
  return reason ? `${name} · ${date} · ${reason}` : `${name} · ${date}`;
};

const SkipList = ({ title, rows }: { title: string; rows: LegacySkipRow[] }) => {
  if (!rows.length) return null;
  return (
    <div className="space-y-1.5">
      <p className="text-sm font-semibold text-ink">{title}</p>
      <ul className="max-h-48 list-disc space-y-1 overflow-y-auto pl-5 text-sm text-muted">
        {rows.map((row, index) => (
          <li key={`${row.source_id || "row"}-${index}`}>{formatSkipRow(row)}</li>
        ))}
      </ul>
    </div>
  );
};

const chipClass = (on: boolean) =>
  [
    "inline-flex h-9 flex-1 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors",
    on
      ? "border-brand bg-brand-soft text-ink"
      : "border-line bg-white text-muted hover:bg-brand-soft/60",
  ].join(" ");

const persistUser = (next: User, setUser: (u: User | null) => void) => {
  editDataFromLocal(next);
  setUser(Object.assign(new User(), getDataFromLocal()));
};

const MigrationToSystem = () => {
  const { user, setUser } = useUser();
  const t: MigrationText = labelText[user?.language ?? "english"].migration;
  const fieldLabel = (field: string) =>
    field === "name" ? t.field_name : field === "overall level" ? t.field_overall : field;
  const userData = user ?? new User();

  const [step, setStep] = useState<WizardStep>("campus");
  const [sameCampusAnswer, setSameCampusAnswer] = useState<"yes" | "no" | null>(null);
  const [bulkCampus, setBulkCampus] = useState<MigrationCampus | null>(null);
  const [rowCampus, setRowCampus] = useState<Record<string, MigrationCampus>>({});
  const [excludedKeys, setExcludedKeys] = useState<Set<string>>(() => new Set());
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [draftName, setDraftName] = useState("");
  const [draftOverall, setDraftOverall] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LegacyImportResult | null>(null);

  const current = useMemo(() => getDataFromLocal() ?? userData, [userData]);
  const sprRows = useMemo(() => listSprRows(current), [current]);
  const lcRows = useMemo(() => listLevelCheckRows(current), [current]);
  const totalLocal = sprRows.length + lcRows.length;

  useEffect(() => {
    if (totalLocal === 0) return;
    if (lcRows.length === 0 && step === "campus") {
      setStep("validate");
    }
  }, [lcRows.length, step, totalLocal]);

  useEffect(() => {
    setRowCampus((prev) => {
      const next = { ...prev };
      for (const row of lcRows) {
        if (next[row.id]) continue;
        const campus = parseCampus(row.campus);
        if (campus) next[row.id] = campus;
      }
      return next;
    });
  }, [lcRows]);

  const candidates = useMemo(() => {
    const refs: { kind: MigrationDocKind; id: string; ready: boolean }[] = [
      ...sprRows.map((row) => ({
        kind: "spr" as const,
        id: row.id,
        ready: isSprReady(row),
      })),
      ...lcRows.map((row) => ({
        kind: "levelCheck" as const,
        id: row.id,
        ready: isLevelCheckReady(row),
      })),
    ];
    return refs;
  }, [sprRows, lcRows]);

  const unresolved = useMemo(
    () =>
      candidates.filter((ref) => {
        const key = migrationDocKey(ref);
        if (excludedKeys.has(key)) return false;
        return !ref.ready;
      }),
    [candidates, excludedKeys]
  );

  const resolvedCount = candidates.length - unresolved.length;
  const readinessPct =
    candidates.length === 0 ? 100 : Math.round((resolvedCount / candidates.length) * 100);

  const includedSpr = useMemo(
    () =>
      sprRows.filter(
        (row) =>
          isSprReady(row) && !excludedKeys.has(migrationDocKey({ kind: "spr", id: row.id }))
      ),
    [sprRows, excludedKeys]
  );

  const includedLc = useMemo(
    () =>
      lcRows.filter(
        (row) =>
          isLevelCheckReady(row) &&
          parseCampus(row.campus) != null &&
          !excludedKeys.has(migrationDocKey({ kind: "levelCheck", id: row.id }))
      ),
    [lcRows, excludedKeys]
  );

  const applyCampusToAll = (campus: MigrationCampus) => {
    const next = Object.assign(new User(), getDataFromLocal());
    next.levelCheck = (Array.isArray(next.levelCheck) ? next.levelCheck : []).map((row) => ({
      ...row,
      campus,
    }));
    persistUser(next, setUser);
    setBulkCampus(campus);
  };

  const applyCampusToRows = (map: Record<string, MigrationCampus>) => {
    const next = Object.assign(new User(), getDataFromLocal());
    next.levelCheck = (Array.isArray(next.levelCheck) ? next.levelCheck : []).map((row) => {
      const id = String(row?.id ?? "");
      const campus = map[id];
      return campus ? { ...row, campus } : row;
    });
    persistUser(next, setUser);
  };

  const handleCampusContinue = () => {
    setError(null);
    if (lcRows.length === 0) {
      setStep("validate");
      return;
    }
    if (sameCampusAnswer === "yes") {
      if (!bulkCampus) {
        setError(t.err_choose_all);
        return;
      }
      applyCampusToAll(bulkCampus);
      setStep("validate");
      return;
    }
    if (sameCampusAnswer === "no") {
      const missing = lcRows.filter((row) => !parseCampus(rowCampus[row.id] ?? row.campus));
      if (missing.length) {
        setError(t.err_choose_each);
        return;
      }
      applyCampusToRows(rowCampus);
      setStep("validate");
      return;
    }
    setError(t.err_yes_no);
  };

  const activeIncomplete = unresolved[0] ?? null;

  const activeSpr: SprMigrationRow | null =
    activeIncomplete?.kind === "spr"
      ? sprRows.find((row) => row.id === activeIncomplete.id) ?? null
      : null;

  const activeLc: LevelCheckMigrationRow | null =
    activeIncomplete?.kind === "levelCheck"
      ? lcRows.find((row) => row.id === activeIncomplete.id) ?? null
      : null;

  const beginEdit = () => {
    if (!activeIncomplete) return;
    const key = migrationDocKey(activeIncomplete);
    setEditingKey(key);
    if (activeSpr) {
      setDraftName(activeSpr.name);
      setDraftOverall("");
    } else if (activeLc) {
      setDraftName(activeLc.student_name);
      setDraftOverall(activeLc.overallCEFR);
    }
  };

  const saveEdit = () => {
    if (!activeIncomplete) return;
    const next = Object.assign(new User(), getDataFromLocal());
    if (activeIncomplete.kind === "spr") {
      next.SPR = (Array.isArray(next.SPR) ? next.SPR : []).map((row) =>
        String(row?.id) === activeIncomplete.id ? { ...row, name: draftName.trim() } : row
      );
    } else {
      next.levelCheck = (Array.isArray(next.levelCheck) ? next.levelCheck : []).map((row) =>
        String(row?.id) === activeIncomplete.id
          ? {
              ...row,
              student_name: draftName.trim(),
              overallCEFR: draftOverall.trim(),
            }
          : row
      );
    }
    persistUser(next, setUser);
    setEditingKey(null);
  };

  const skipCurrent = () => {
    if (!activeIncomplete) return;
    const key = migrationDocKey(activeIncomplete);
    setExcludedKeys((prev) => new Set(prev).add(key));
    setEditingKey(null);
  };

  const handleValidateContinue = () => {
    if (unresolved.length) {
      setError(t.err_unresolved);
      return;
    }
    setError(null);
    setStep("review");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (pending) return;
    setError(null);
    setResult(null);
    setPending(true);
    try {
      const login = await teacherLogin(email.trim(), password);
      const fresh = getDataFromLocal() ?? userData;
      const includedSprIds = new Set(includedSpr.map((row) => row.id));
      const includedLcIds = new Set(includedLc.map((row) => row.id));
      const payloadUser = Object.assign(new User(), fresh);
      payloadUser.SPR = (Array.isArray(fresh.SPR) ? fresh.SPR : []).filter((row) =>
        includedSprIds.has(String(row?.id ?? ""))
      );
      payloadUser.levelCheck = (Array.isArray(fresh.levelCheck) ? fresh.levelCheck : [])
        .filter((row) => includedLcIds.has(String(row?.id ?? "")))
        .map((row) => ({
          ...row,
          campus: parseCampus(row.campus) ?? undefined,
        }));
      if (!payloadUser.SPR.length && !payloadUser.levelCheck.length) {
        throw new Error(t.err_none_left);
      }
      const data = await legacyImport(login.token, payloadUser);
      setResult(data);
      setPassword("");
      setStep("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : t.err_move_failed);
    } finally {
      setPending(false);
    }
  };

  const alreadyExists = [
    ...(result?.spr.already_exists ?? []),
    ...(result?.level_check.already_exists ?? []),
  ];
  const addManually = [
    ...(result?.spr.add_manually ?? []),
    ...(result?.level_check.add_manually ?? []),
  ];
  const importedCount =
    (result?.spr.imported ?? 0) + (result?.level_check.imported ?? 0);

  const stepLabel =
    step === "campus"
      ? t.step_campus
      : step === "validate"
        ? t.step_validate
        : step === "review"
          ? t.step_review
          : step === "login"
            ? t.step_login
            : t.step_done;

  // Nothing saved in this browser: show only a short note, not the wizard.
  if (totalLocal === 0 && step !== "done") {
    return (
      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="panel w-full max-w-md px-6 py-10 text-center">
          <p className="font-secondary text-lg font-semibold text-ink">{t.no_local}</p>
          <p className="mt-2 text-sm text-muted">{t.no_local_help}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-4 px-4 py-6 sm:py-10">
      <div className="flex items-center gap-2">
        <Link
          to="/?view=spr"
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-muted transition hover:bg-brand-soft hover:text-brand"
        >
          <ArrowLeft size={16} />
          {t.back}
        </Link>
      </div>

      <div className="panel overflow-hidden">
        <div className="bg-brand px-4 py-3">
          <h1 className="font-secondary text-base font-semibold text-white">
            {t.title}
          </h1>
          {step !== "done" ? (
            <p className="mt-1 text-xs text-white/80">{stepLabel}</p>
          ) : null}
        </div>

        <div className="space-y-4 px-4 py-5 sm:px-6">
          {step === "campus" && lcRows.length > 0 ? (
            <div className="space-y-4">
              <div className="rounded-xl border border-line bg-brand-soft/50 px-3 py-2.5 text-sm text-ink">
                <p className="font-medium">{t.campus_question}</p>
                <p className="mt-1 text-muted">{t.campus_help}</p>
              </div>

              <div className="flex gap-1.5" role="group" aria-label={t.same_campus_aria}>
                <button
                  type="button"
                  className={chipClass(sameCampusAnswer === "yes")}
                  aria-pressed={sameCampusAnswer === "yes"}
                  onClick={() => {
                    setSameCampusAnswer("yes");
                    setError(null);
                  }}
                >
                  {t.yes}
                </button>
                <button
                  type="button"
                  className={chipClass(sameCampusAnswer === "no")}
                  aria-pressed={sameCampusAnswer === "no"}
                  onClick={() => {
                    setSameCampusAnswer("no");
                    setError(null);
                  }}
                >
                  {t.no}
                </button>
              </div>

              {sameCampusAnswer === "yes" ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-ink">{t.choose_campus_all}</p>
                  <div className="flex gap-1.5">
                    {CAMPUS_OPTIONS.map((campus) => (
                      <button
                        key={campus}
                        type="button"
                        className={chipClass(bulkCampus === campus)}
                        aria-pressed={bulkCampus === campus}
                        onClick={() => setBulkCampus(campus)}
                      >
                        {campus}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {sameCampusAnswer === "no" ? (
                <div className="max-h-72 space-y-2 overflow-y-auto rounded-xl border border-line p-3">
                  {lcRows.map((row) => (
                    <div
                      key={row.id}
                      className="flex flex-col gap-2 border-b border-line/70 py-2 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-ink">
                          {row.student_name || t.untitled}
                        </p>
                        <p className="text-xs text-muted">
                          {formatMigrationDate(row.dateCreated)} · {row.language || "—"}
                        </p>
                      </div>
                      <div className="flex w-full gap-1.5 sm:w-40">
                        {CAMPUS_OPTIONS.map((campus) => (
                          <button
                            key={campus}
                            type="button"
                            className={chipClass(
                              (rowCampus[row.id] ?? parseCampus(row.campus)) === campus
                            )}
                            aria-pressed={
                              (rowCampus[row.id] ?? parseCampus(row.campus)) === campus
                            }
                            onClick={() =>
                              setRowCampus((prev) => ({ ...prev, [row.id]: campus }))
                            }
                          >
                            {campus}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              {error ? (
                <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </p>
              ) : null}

              <button type="button" className="btn-primary w-full" onClick={handleCampusContinue}>
                {t.continue}
              </button>
            </div>
          ) : null}

          {step === "validate" ? (
            <div className="space-y-4">
              <div className="rounded-xl border border-line bg-brand-soft/50 px-3 py-2.5 text-sm text-ink">
                <p className="font-medium">{t.check_title}</p>
                <p className="mt-1 text-muted">{t.check_help}</p>
                <p className="mt-2 text-sm font-medium tabular-nums">
                  {fill(t.ready, {
                    done: resolvedCount,
                    total: candidates.length,
                    pct: readinessPct,
                  })}
                </p>
              </div>

              {!activeIncomplete ? (
                <p className="text-sm text-muted">
                  {t.all_ready}
                </p>
              ) : (
                <div className="space-y-3 rounded-xl border border-line p-3">
                  {activeSpr ? (
                    <>
                      <p className="text-sm font-medium text-ink">
                        {t.spr} · {formatMigrationDate(activeSpr.dateCreated)}
                      </p>
                      <p className="text-sm text-muted">
                        {fill(t.missing, {
                          fields: missingSprFields(activeSpr).map(fieldLabel).join(", "),
                        })}
                      </p>
                    </>
                  ) : null}
                  {activeLc ? (
                    <>
                      <p className="text-sm font-medium text-ink">
                        {t.level_check} · {formatMigrationDate(activeLc.dateCreated)} ·{" "}
                        {activeLc.language}
                      </p>
                      <p className="text-sm text-muted">
                        {fill(t.missing, {
                          fields: missingLevelCheckFields(activeLc).map(fieldLabel).join(", "),
                        })}
                      </p>
                    </>
                  ) : null}

                  {editingKey ===
                  (activeIncomplete
                    ? migrationDocKey(activeIncomplete)
                    : null) ? (
                    <div className="space-y-3">
                      <label className="block space-y-1.5 text-sm">
                        <span className="font-medium text-ink">{t.name}</span>
                        <input
                          value={draftName}
                          onChange={(e) => setDraftName(e.target.value)}
                          className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-base text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                          autoFocus
                        />
                      </label>
                      {activeLc ? (
                        <label className="block space-y-1.5 text-sm">
                          <span className="font-medium text-ink">{t.overall_level}</span>
                          <input
                            value={draftOverall}
                            onChange={(e) => setDraftOverall(e.target.value)}
                            placeholder={t.overall_placeholder}
                            className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-base text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                          />
                        </label>
                      ) : null}
                      <div className="flex gap-2">
                        <button type="button" className="btn-primary flex-1" onClick={saveEdit}>
                          {t.save}
                        </button>
                        <button
                          type="button"
                          className="btn-secondary flex-1"
                          onClick={() => setEditingKey(null)}
                        >
                          {t.cancel}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <button type="button" className="btn-primary flex-1" onClick={beginEdit}>
                        {t.add_missing}
                      </button>
                      <button type="button" className="btn-secondary flex-1" onClick={skipCurrent}>
                        {t.skip}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {excludedKeys.size ? (
                <p className="text-xs text-muted">
                  {fill(t.excluded_count, { count: excludedKeys.size })}
                </p>
              ) : null}

              {error ? (
                <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </p>
              ) : null}

              <div className="flex gap-2">
                {lcRows.length > 0 ? (
                  <button
                    type="button"
                    className="btn-secondary flex-1"
                    onClick={() => {
                      setError(null);
                      setStep("campus");
                    }}
                  >
                    {t.back}
                  </button>
                ) : null}
                <button
                  type="button"
                  className="btn-primary flex-1"
                  onClick={handleValidateContinue}
                  disabled={Boolean(unresolved.length)}
                >
                  {t.continue}
                </button>
              </div>
            </div>
          ) : null}

          {step === "review" ? (
            <div className="space-y-4">
              <div className="rounded-xl border border-line bg-brand-soft/50 px-3 py-2.5 text-sm text-ink">
                <p className="font-medium">{t.review_title}</p>
                <p className="mt-1 text-muted">
                  {fill(t.review_counts, { spr: includedSpr.length, lc: includedLc.length })}
                  {excludedKeys.size ? fill(t.review_excluded, { count: excludedKeys.size }) : ""}
                </p>
              </div>

              {includedSpr.length ? (
                <div className="space-y-1.5">
                  <p className="text-sm font-semibold text-ink">{t.spr}</p>
                  <ul className="max-h-40 list-disc space-y-1 overflow-y-auto pl-5 text-sm text-muted">
                    {includedSpr.map((row) => (
                      <li key={row.id}>
                        {row.name} · {formatMigrationDate(row.dateCreated)}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {includedLc.length ? (
                <div className="space-y-1.5">
                  <p className="text-sm font-semibold text-ink">{t.level_check}</p>
                  <ul className="max-h-40 list-disc space-y-1 overflow-y-auto pl-5 text-sm text-muted">
                    {includedLc.map((row) => (
                      <li key={row.id}>
                        {row.student_name} · {formatMigrationDate(row.dateCreated)} ·{" "}
                        {parseCampus(row.campus) ?? "—"}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {!includedSpr.length && !includedLc.length ? (
                <p className="text-sm text-muted">{t.nothing_left}</p>
              ) : null}

              <div className="flex gap-2">
                <button
                  type="button"
                  className="btn-secondary flex-1"
                  onClick={() => setStep("validate")}
                >
                  {t.back}
                </button>
                <button
                  type="button"
                  className="btn-primary flex-1"
                  disabled={!includedSpr.length && !includedLc.length}
                  onClick={() => setStep("login")}
                >
                  {t.continue}
                </button>
              </div>
            </div>
          ) : null}

          {step === "login" ? (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="rounded-xl border border-line bg-brand-soft/50 px-3 py-2.5 text-sm text-ink">
                <p>{fill(t.spr_count, { count: includedSpr.length })}</p>
                <p className="mt-1">{fill(t.lc_count, { count: includedLc.length })}</p>
                <p className="mt-2 text-muted">{t.sign_in_help}</p>
              </div>

              <label className="block space-y-1.5 text-sm">
                <span className="font-medium text-ink">{t.email}</span>
                <input
                  type="email"
                  autoComplete="username"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@geos.com.tw"
                  className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-base text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                  disabled={pending}
                />
              </label>

              <label className="block space-y-1.5 text-sm">
                <span className="font-medium text-ink">{t.password}</span>
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-base text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                  disabled={pending}
                />
              </label>

              {error ? (
                <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </p>
              ) : null}

              <div className="flex gap-2">
                <button
                  type="button"
                  className="btn-secondary flex-1"
                  disabled={pending}
                  onClick={() => setStep("review")}
                >
                  {t.back}
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={pending || (!includedSpr.length && !includedLc.length)}
                >
                  {pending ? (
                    <span className="inline-flex items-center justify-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      {t.moving}
                    </span>
                  ) : (
                    t.submit
                  )}
                </button>
              </div>
            </form>
          ) : null}

          {step === "done" && result ? (
            <div className="space-y-4">
              <div className="rounded-xl border border-line bg-brand-soft/50 px-3 py-2.5">
                <p className="text-sm font-medium text-ink">
                  {fill(importedCount === 1 ? t.moved_one : t.moved_many, {
                    count: importedCount,
                  })}
                </p>
                <p className="mt-1 text-sm text-muted">
                  {fill(t.review_counts, {
                    spr: result.spr.imported,
                    lc: result.level_check.imported,
                  })}
                </p>
              </div>

              {alreadyExists.length ? (
                <div className="space-y-2 rounded-xl border border-amber-200 bg-amber-50/80 p-3">
                  <p className="text-sm text-ink">{t.duplicate}</p>
                  <SkipList title={t.already_in_geos} rows={alreadyExists} />
                </div>
              ) : null}

              {addManually.length ? (
                <div className="space-y-2 rounded-xl border border-line p-3">
                  <p className="text-sm text-ink">{t.add_manually_help}</p>
                  <SkipList title={t.add_manually} rows={addManually} />
                </div>
              ) : null}

              <div className="flex flex-col gap-2">
                <a
                  className="btn-primary w-full text-center"
                  href={result.portal.spr_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.open_sprs}
                </a>
                <a
                  className="btn-secondary w-full text-center"
                  href={result.portal.level_check_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.open_lcs}
                </a>
                <Link to="/?view=spr" className="btn-secondary w-full text-center">
                  {t.back_to_forms}
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MigrationToSystem;
