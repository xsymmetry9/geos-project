import { SquarePen, SquareX } from "lucide-react";

type ButtonProps = {
  handleControl: () => void;
};
export const CreateNewFormBtn: React.FC<ButtonProps> = ({ handleControl }) => (
  <button onClick={handleControl} className="btn-primary flex items-center justify-center gap-2">
    <SquarePen size={18} />
    <span>Create</span>
  </button>
);

export const CloseBtn: React.FC<ButtonProps> = ({ handleControl }) => (
  <button className="absolute top-0 right-0 cursor-pointer p-1" onClick={handleControl}>
    <SquareX className="h-6 w-6 text-teal-700 group-hover:text-white" />
  </button>
);
