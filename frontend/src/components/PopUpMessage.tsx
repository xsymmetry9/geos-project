import React from "react";
import { Link } from "react-router-dom";
import { SquareX, CircleCheckBig } from "lucide-react";
import { useUser } from "@/context/UserContext";
import labelText from "@/assets/other/labelText.json";

interface PopUpMessageProps {
  setDisplayPopupMessage: React.Dispatch<React.SetStateAction<boolean>>;
  formId: string;
}

const PopUpMessage: React.FC<PopUpMessageProps> = ({ formId, setDisplayPopupMessage }) => {
  const { user } = useUser();
  const language = user?.language ?? "english";
  const t = labelText[language];

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
        onClick={() => setDisplayPopupMessage(false)}
      />
      <div className="panel absolute top-1/2 left-1/2 z-10 w-[min(100%-2rem,24rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
        <div className="flex w-full items-center justify-between bg-brand px-3 py-2">
          <p className="text-sm font-semibold text-white">{t.saved}</p>
          <button
            type="button"
            className="cursor-pointer rounded p-1 hover:bg-white/10"
            onClick={() => setDisplayPopupMessage(false)}
            aria-label="Close"
          >
            <SquareX className="text-white" size={20} />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 px-6 py-8">
          <CircleCheckBig size={48} className="text-brand" />
          <p className="text-center text-ink">{t.saved_success}</p>
          <Link className="btn-primary w-full" to={`/spr/view/${formId}`}>
            {t.view_page}
          </Link>
          <button
            type="button"
            className="btn-secondary w-full"
            onClick={() => setDisplayPopupMessage(false)}
          >
            {t.keep_editing}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpMessage;
