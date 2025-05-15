export const changeLanguageFormat = (shortLanguage) => {
  if (shortLanguage === "ch") return "chinese";
  else if (shortLanguage === "kr") return "korean";
  else if (shortLanguage === "jp") return "japanese";
  else {
    return "english";
  }
};
