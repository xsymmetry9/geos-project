import labelTextJson from "@/assets/other/labelText.json";

type LanguageKey = "english" | "chinese" | "korean" | "japanese";

interface ButtonLabels {
  nextPage: string;
  backPage: string;
  printPage: string;
}
const getPageLabels = (language: LanguageKey): ButtonLabels => {
  const labels = labelTextJson[language] as any; //by pass any
  return {
    nextPage: labels.nextPage,
    backPage: labels.backPage,
    printPage: labels.printPage,
  };
};

interface ButtonProps {
  page: number;
  handler: (e: React.MouseEvent<HTMLInputElement>) => void;
  language: LanguageKey;
}

const Button: React.FC<ButtonProps> = ({ page, handler, language }) => {
  const { nextPage, backPage } = getPageLabels(language);
  return (
    <>
      {page === 0 ? (
        <>
          <input
            className="btn-primary"
            type="button"
            onClick={handler}
            name="next"
            value={nextPage}
          />
        </>
      ) : page != 3 ? (
        <>
          <input
            className="btn-primary"
            type="button"
            onClick={handler}
            name="back"
            value={backPage}
          />
          <input
            className="btn-primary"
            type="button"
            onClick={handler}
            name="next"
            value={nextPage}
          />
        </>
      ) : (
        <>
          <input
            className="btn-primary"
            type="button"
            onClick={handler}
            name="back"
            value={backPage}
          />
        </>
      )}
    </>
  );
};

export default Button;
