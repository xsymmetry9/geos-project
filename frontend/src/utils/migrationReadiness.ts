import type User from "@/type/User";

export type MigrationCampus = "CH" | "TM";

export type MigrationDocKind = "spr" | "levelCheck";

export type MigrationDocRef = {
  kind: MigrationDocKind;
  id: string;
};

export const migrationDocKey = (ref: MigrationDocRef) => `${ref.kind}:${ref.id}`;

const asId = (value: unknown) => String(value ?? "").trim();

const asText = (value: unknown) => String(value ?? "").trim();

export const formatMigrationDate = (value: unknown) => {
  if (!value) return "—";
  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) return "—";
  return date.toISOString().slice(0, 10);
};

export type SprMigrationRow = {
  id: string;
  name: string;
  dateCreated: unknown;
};

export type LevelCheckMigrationRow = {
  id: string;
  student_name: string;
  overallCEFR: string;
  language: string;
  dateCreated: unknown;
  campus?: MigrationCampus | string | null;
};

export const listSprRows = (user: User): SprMigrationRow[] =>
  (Array.isArray(user.SPR) ? user.SPR : [])
    .map((row) => ({
      id: asId((row as { id?: unknown }).id),
      name: asText((row as { name?: unknown }).name),
      dateCreated: (row as { dateCreated?: unknown }).dateCreated,
    }))
    .filter((row) => row.id);

export const listLevelCheckRows = (user: User): LevelCheckMigrationRow[] =>
  (Array.isArray(user.levelCheck) ? user.levelCheck : [])
    .map((row) => ({
      id: asId((row as { id?: unknown }).id),
      student_name: asText((row as { student_name?: unknown }).student_name),
      overallCEFR: asText(
        (row as { overallCEFR?: unknown; overall_cefr?: unknown }).overallCEFR ??
          (row as { overall_cefr?: unknown }).overall_cefr
      ),
      language: asText((row as { language?: unknown }).language).toLowerCase() || "english",
      dateCreated: (row as { dateCreated?: unknown }).dateCreated,
      campus: (row as { campus?: unknown }).campus as MigrationCampus | string | null | undefined,
    }))
    .filter((row) => row.id);

/** SPR needs a name. Level Check needs name + overall. Skills / S&W never block. */
export const isSprReady = (row: SprMigrationRow) => Boolean(row.name);

export const isLevelCheckReady = (row: LevelCheckMigrationRow) =>
  Boolean(row.student_name && row.overallCEFR);

export const missingSprFields = (row: SprMigrationRow) => {
  const missing: string[] = [];
  if (!row.name) missing.push("name");
  return missing;
};

export const missingLevelCheckFields = (row: LevelCheckMigrationRow) => {
  const missing: string[] = [];
  if (!row.student_name) missing.push("name");
  if (!row.overallCEFR) missing.push("overall level");
  return missing;
};

export const parseCampus = (value: unknown): MigrationCampus | null => {
  const raw = asText(value).toUpperCase();
  return raw === "CH" || raw === "TM" ? raw : null;
};

export const allLevelChecksHaveCampus = (rows: LevelCheckMigrationRow[]) =>
  rows.every((row) => parseCampus(row.campus) != null);
