import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useUser } from "@/context/UserContext";
import User from "@/type/User";
import { getDataFromLocal } from "@/utils/functions";
import {
  legacyImport,
  teacherLogin,
  type LegacyImportResult,
  type LegacySkipRow,
} from "@/utils/geosApiBridge";

const DUPLICATE_MESSAGE =
  "It already exists in the db. Please check teacher's portal to verify if SPR or Level Checks already exist in the system.";

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

const MigrationToSystem = () => {
  const { user } = useUser();
  const userData = user ?? new User();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LegacyImportResult | null>(null);

  const counts = useMemo(() => {
    const current = getDataFromLocal() ?? userData;
    return {
      spr: Array.isArray(current.SPR) ? current.SPR.length : 0,
      levelCheck: Array.isArray(current.levelCheck) ? current.levelCheck.length : 0,
    };
  }, [userData, result]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (pending) return;
    setError(null);
    setResult(null);
    setPending(true);
    try {
      const login = await teacherLogin(email.trim(), password);
      const current = getDataFromLocal() ?? userData;
      const data = await legacyImport(login.token, current);
      setResult(data);
      setPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't move reports to GEOS");
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
  const totalLocal = counts.spr + counts.levelCheck;

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-4 px-4 py-6 sm:py-10">
      <div className="flex items-center gap-2">
        <Link
          to="/home?view=spr"
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-muted transition hover:bg-brand-soft hover:text-brand"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
      </div>

      <div className="panel overflow-hidden">
        <div className="bg-brand px-4 py-3">
          <h1 className="font-secondary text-base font-semibold text-white">
            Move SPR and Level Check to Teacher&apos;s Portal
          </h1>
        </div>

        <div className="space-y-4 px-4 py-5 sm:px-6">
          {!result ? (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="rounded-xl border border-line bg-brand-soft/50 px-3 py-2.5 text-sm text-ink">
                {totalLocal === 0 ? (
                  <p className="text-muted">No local reports found in this browser.</p>
                ) : (
                  <>
                    <p>Number of SPR: {counts.spr}</p>
                    <p className="mt-1">Number of Level Checks: {counts.levelCheck}</p>
                    <p className="mt-2 text-muted">They are ready to be moved.</p>
                  </>
                )}
              </div>

              <p className="text-sm text-muted">Sign in with your GEOS teacher account.</p>

              <label className="block space-y-1.5 text-sm">
                <span className="font-medium text-ink">Email</span>
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
                <span className="font-medium text-ink">Password</span>
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

              <button
                type="submit"
                className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                disabled={pending || totalLocal === 0}
              >
                {pending ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Moving…
                  </span>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="rounded-xl border border-line bg-brand-soft/50 px-3 py-2.5">
                <p className="text-sm font-medium text-ink">
                  Moved {importedCount} report{importedCount === 1 ? "" : "s"}
                </p>
                <p className="mt-1 text-sm text-muted">
                  {result.spr.imported} SPR · {result.level_check.imported} Level Check
                </p>
              </div>

              {alreadyExists.length ? (
                <div className="space-y-2 rounded-xl border border-amber-200 bg-amber-50/80 p-3">
                  <p className="text-sm text-ink">{DUPLICATE_MESSAGE}</p>
                  <SkipList title="Already in GEOS" rows={alreadyExists} />
                </div>
              ) : null}

              {addManually.length ? (
                <div className="space-y-2 rounded-xl border border-line p-3">
                  <p className="text-sm text-ink">
                    These need to be added manually in the teacher portal (empty name or
                    invalid date).
                  </p>
                  <SkipList title="Add manually" rows={addManually} />
                </div>
              ) : null}

              <div className="flex flex-col gap-2">
                <a
                  className="btn-primary w-full text-center"
                  href={result.portal.spr_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open SPRs in teacher portal
                </a>
                <a
                  className="btn-secondary w-full text-center"
                  href={result.portal.level_check_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Level Checks
                </a>
                <Link to="/home?view=spr" className="btn-secondary w-full text-center">
                  Back to forms
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MigrationToSystem;
