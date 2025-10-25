import chineseText from "@/assets/other/chinese/levelCheckForm.json";
import koreanText from "@/assets/other/korean/levelCheckForm.json";
import japaneseText from "@/assets/other/japanese/levelCheckForm.json";
import englishText from "@/assets/other/english/levelCheckForm.json";

export const levelCheckTranslation = (language: string) => {
  if (language === "chinese") return chineseText.print;
  if (language === "korean") return koreanText.print;
  if (language === "japanese") return japaneseText.print;
  return englishText.print;
};

export const levelCheckFormTranslation = (language: string) => {
  if (language === "chinese") return chineseText.form;
  if (language === "korean") return koreanText.form;
  if (language === "japanese") return japaneseText.form;
  return englishText.form;
};