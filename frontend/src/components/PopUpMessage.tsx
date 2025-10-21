import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { SquareX, CircleCheckBig } from "lucide-react";

interface PopUpMessageProps {
  setDisplayPopupMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopUpMessage: React.FC<PopUpMessageProps> = ({ setDisplayPopupMessage }) => {
  const { user } = useUser();
  const language = user?.language;
  return (
    <div className="outline-dark-green absolute top-0 top-1/2 left-1/2 z-1 h-[350px] w-full max-w-[400px] -translate-x-1/2 -translate-y-1/2 transform rounded bg-white outline-2">
      <div className="bg-dark-green mt-0 flex w-full justify-end py-2">
        <button className="cursor-pointer" onClick={() => setDisplayPopupMessage(false)}>
          <SquareX className="text-white" />
        </button>
      </div>
      <div className="flex h-full flex-col items-center justify-center gap-3">
        <CircleCheckBig size={48} className="text-green-600" />
        <p className="text-secondary text-center">Saved successfully!</p>
        <Link className="btn-primary w-[300px]" to={`/home`}>
          link to dashboard
        </Link>
      </div>
    </div>
  );
};
export default PopUpMessage;
