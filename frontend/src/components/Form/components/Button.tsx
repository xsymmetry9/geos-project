<<<<<<< HEAD
import PropTypes from "prop-types";
import React from "react";

const Button = ({ page, handler, language }) => {
  const title = {
    english: { next_page: "Next", back_page: "Back", print_page: "Print" },
    chinese: { next_page: "下一個", back_page: "上一個", print_page: "列印" },
    korean: { next_page: "다음", back_page: "이전", print_page: "인쇄" },
    japanese: { next_page: "次へ", back_page: "前へ", print_page: "印刷" },
  };
=======
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
    printPage: labels.printPage};
}

interface ButtonProps {
  page: number;
  handler: (e: React.MouseEvent<HTMLInputElement>) => void;
  language: LanguageKey;
}

const Button: React.FC<ButtonProps> = ({ page, handler, language }) => {
  const {nextPage, backPage, printPage} = getPageLabels(language);
>>>>>>> 8dc84781a0d74170503ab50a7efdbde0598b5c9c
  return (
    <>
      {page === 0 ? (
        <>
          <input
            className="btn-primary"
            type="button"
            onClick={handler}
            name="next"
<<<<<<< HEAD
            value={title[language.toLowerCase()].next_page}
=======
            value= {nextPage}
>>>>>>> 8dc84781a0d74170503ab50a7efdbde0598b5c9c
          />
        </>
      ) : page != 3 ? (
        <>
          <input
            className="btn-primary"
            type="button"
            onClick={handler}
            name="back"
<<<<<<< HEAD
            value={title[language.toLowerCase()].back_page}
=======
            value={backPage}
>>>>>>> 8dc84781a0d74170503ab50a7efdbde0598b5c9c
          />
          <input
            className="btn-primary"
            type="button"
            onClick={handler}
            name="next"
<<<<<<< HEAD
            value={title[language.toLowerCase()].next_page}
=======
            value={nextPage}
>>>>>>> 8dc84781a0d74170503ab50a7efdbde0598b5c9c
          />
        </>
      ) : (
        <>
          <input
            className="btn-primary"
            type="button"
            onClick={handler}
            name="back"
<<<<<<< HEAD
            value={title[language.toLowerCase()].back_page}
=======
            value={backPage}
>>>>>>> 8dc84781a0d74170503ab50a7efdbde0598b5c9c
          />
        </>
      )}
    </>
  );
};
<<<<<<< HEAD
Button.propTypes = {
  page: PropTypes.number,
  handler: PropTypes.func,
  language: PropTypes.string,
};
=======

>>>>>>> 8dc84781a0d74170503ab50a7efdbde0598b5c9c
export default Button;
