import { StrengthAndWeakness, EnglishEntry, CjkEntry } from "@/type/LevelCheckForm";

export const emptySW = new StrengthAndWeakness();

export const isEnglishLang = (lang: any) =>
  lang === undefined || lang === null || lang === "english";

export const isCjkLang = (lang: any) =>
  lang === "chinese" || lang === "japanese" || lang === "korean";

export const normalizeEnglish = (r: any): EnglishEntry => ({
  language: "english",
  id: r?.id ?? "",
  dateCreated: r?.dateCreated ?? "",
  student_name: r?.student_name ?? "",
  feedback: r?.feedback ?? "",
  bookRecommendation: r?.bookRecommendation ?? "",
  overallCEFR: r?.overallCEFR ?? "",
  speaking: r?.speaking ?? emptySW,
  confidence: r?.confidence ?? emptySW,
  grammar: r?.grammar ?? emptySW,
  vocabulary: r?.vocabulary ?? emptySW,
  listening: r?.listening ?? emptySW,
  pronunciation: r?.pronunciation ?? emptySW,
});

export const normalizeCjk = (r: any): CjkEntry => ({
  language: r?.language ?? "chinese",
  id: r?.id ?? "",
  dateCreated: r?.dateCreated ?? "",
  student_name: r?.student_name ?? "",
  feedback: r?.feedback ?? "",
  bookRecommendation: r?.bookRecommendation ?? "",
  overallCEFR: r?.overallCEFR ?? "",
  // Order: pronunciation, vocabulary, listening, grammar, speaking, accuracy
  pronunciation: r?.pronunciation ?? emptySW,
  vocabulary: r?.vocabulary ?? emptySW,
  listening: r?.listening ?? emptySW,
  grammar: r?.grammar ?? emptySW,
  speaking: r?.speaking ?? emptySW,
  accuracy: r?.accuracy ?? emptySW,
});

export const normalizeLevelCheck = (r: any): EnglishEntry | CjkEntry => {
  if (isCjkLang(r?.language)) return normalizeCjk(r);
  return normalizeEnglish(r);
};

export const getLevelCheckById = (id: string | undefined): EnglishEntry | CjkEntry | null => {
  const targetId = (id ?? "").toString();
  if (!targetId) return null;

  const raw = localStorage.getItem("GEOS_app");
  if (!raw) return null;

  const store = JSON.parse(raw);
  const arr = Array.isArray(store?.levelCheck) ? store.levelCheck : null;
  if (!arr) return null;

  const result = arr.find((x: any) => String(x?.id) === targetId);
  return result ? normalizeLevelCheck(result) : null;
};
