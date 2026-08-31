import { ChevronDown } from "lucide-react";

export type LevelsFilterOption = {
  value: string;
  label: string;
};

type LevelsFilterSelectProps = {
  id: string;
  label: string;
  value: string;
  options: LevelsFilterOption[];
  onChange: (value: string) => void;
  /** Extra classes on the outer wrapper (e.g. width). */
  className?: string;
  capitalizeOptions?: boolean;
};

const selectClassName =
  "w-full appearance-none rounded-xl border border-line bg-white py-2.5 pr-10 pl-3.5 text-sm font-medium text-ink transition-colors hover:border-brand focus:border-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/30";

/** Shared filter dropdown used on the Levels page (language, category, aspect). */
const LevelsFilterSelect = ({
  id,
  label,
  value,
  options,
  onChange,
  className = "",
  capitalizeOptions = false,
}: LevelsFilterSelectProps) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-muted">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          className={`${selectClassName}${capitalizeOptions ? " capitalize" : ""}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          strokeWidth={2}
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default LevelsFilterSelect;
