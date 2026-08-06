import { ChevronLeft, ChevronRight } from "lucide-react";
import labelTextJson from "@/assets/other/labelText.json";

type LanguageKey = "english" | "chinese" | "korean" | "japanese";

interface ButtonLabels {
  nextPage: string;
  backPage: string;
  printPage: string;
}

const getPageLabels = (language: LanguageKey): ButtonLabels => {
  const labels = labelTextJson[language] as any;
  return {
    nextPage: labels.nextPage,
    backPage: labels.backPage,
    printPage: labels.printPage,
  };
};

interface ButtonProps {
  page: number;
  handler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  language: LanguageKey;
}

const Button: React.FC<ButtonProps> = ({ page, handler, language }) => {
  const { nextPage, backPage } = getPageLabels(language);
  const showBack = page > 0;
  const showNext = page < 3;

  return (
    <>
      {showBack ? (
        <button
          type="button"
          className="form-nav-btn form-nav-btn-back"
          onClick={handler}
          name="back"
        >
          <ChevronLeft size={16} aria-hidden="true" />
          <span>{backPage}</span>
        </button>
      ) : (
        <span className="form-actions-spacer" aria-hidden="true" />
      )}

      {showNext && (
        <button
          type="button"
          className="form-nav-btn form-nav-btn-next"
          onClick={handler}
          name="next"
        >
          <span>{nextPage}</span>
          <ChevronRight size={16} aria-hidden="true" />
        </button>
      )}
    </>
  );
};

export default Button;
