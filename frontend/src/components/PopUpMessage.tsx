import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../pages/SPRForm";
import { SquareX, CircleCheckBig } from "lucide-react";

interface PopUpMessageProps {
  setDisplayPopupMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopUpMessage: React.FC<PopUpMessageProps> = ({ setDisplayPopupMessage }) => {
  const language = useContext(LanguageContext);
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1 bg-white top-0 max-w-[400px] h-[350px] w-full outline-2 outline-dark-green rounded">
      <div className="mt-0 bg-dark-green w-full flex justify-end py-2">
        <button className="cursor-pointer" onClick={() => setDisplayPopupMessage(false)}>
          <SquareX className="text-white"/>
        </button>
      </div>
      <div className="flex flex-col justify-center items-center gap-3 h-full">
        <CircleCheckBig size={48} className="text-green-600"/>
        <p className="text-secondary text-center">Saved successfully!</p>
        <Link className="btn-primary w-[300px]" to={`/home/${language}`}>
          link to dashboard
        </Link>
      </div>
    </div>
  );
};
export default PopUpMessage;
