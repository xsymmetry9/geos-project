import type User from "@/type/User";

const apiBase = () => {
  const fromEnv = import.meta.env.VITE_GEOS_API_URL;
  if (fromEnv) return String(fromEnv).replace(/\/$/, "");
  // Production Cloudflare/Vercel builds talk to Fly prod unless overridden.
  if (import.meta.env.PROD) return "https://geos-api.fly.dev";
  return "http://localhost:4000";
};

type ApiEnvelope<T> = {
  success: boolean;
  data: T;
  error: string | null;
};

export type LegacySkipRow = {
  source_id: string | null;
  name: string | null;
  date: string | null;
  reason?: string;
};

export type LegacyImportBucket = {
  imported: number;
  already_exists: LegacySkipRow[];
  add_manually: LegacySkipRow[];
};

export type LegacyImportResult = {
  spr: LegacyImportBucket;
  level_check: LegacyImportBucket;
  portal: {
    spr_url: string;
    level_check_url: string;
  };
};

export type TeacherLoginResult = {
  token: string;
  teacher: {
    id: string;
    name: string;
    email: string;
    teacher_role?: string;
  };
  must_change_password?: boolean;
};

export async function teacherLogin(email: string, password: string): Promise<TeacherLoginResult> {
  const res = await fetch(`${apiBase()}/api/auth/teacher/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      typeof json?.error === "string" ? json.error : "Couldn't sign in to GEOS"
    );
  }
  if (!json?.token) throw new Error("Couldn't sign in to GEOS");
  return json as TeacherLoginResult;
}

export async function legacyImport(
  token: string,
  user: User
): Promise<LegacyImportResult> {
  const res = await fetch(`${apiBase()}/api/teachers/me/legacy-import`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      language: user.language || "english",
      SPR: user.SPR || [],
      levelCheck: user.levelCheck || [],
    }),
  });
  const json = (await res.json().catch(() => ({}))) as ApiEnvelope<LegacyImportResult> & {
    error?: string;
  };
  if (!res.ok || json?.success === false) {
    throw new Error(
      typeof json?.error === "string" ? json.error : "Couldn't import reports into GEOS"
    );
  }
  if (!json?.data) throw new Error("Couldn't import reports into GEOS");
  return json.data;
}
