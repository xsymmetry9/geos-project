import eng from "@/assets/other/english/levelCheck.json";
import chi from "@/assets/other/chinese/levelCheck.json";
import kor from "@/assets/other/korean/levelCheck.json";
import jap from "@/assets/other/japanese/levelCheck.json";

type Language = "english" | "chinese" | "korean" | "japanese";

export const tLevelCheckData = (language: Language) => {
      console.log(language);

  if (language === "english") return eng;
  if (language === "chinese") return chi;
  if (language === "korean") return kor;
  if (language === "japanese") return jap;
};
