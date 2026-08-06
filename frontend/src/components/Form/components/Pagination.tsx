import labelText from "@/assets/other/labelText.json";

type Language = keyof typeof labelText;

interface PaginationProps {
  page: number;
  language: Language;
  setPage: (index: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, language, setPage }) => {
  const form = labelText[language].form;
  const steps = [form.step_info, form.step_level, form.step_feedback, form.step_review];
  const progress = ((page + 1) / steps.length) * 100;

  return (
    <div className="m-auto w-full max-w-lg">
      <div className="form-progress">
        <div className="form-progress-meta">
          <p className="form-progress-current">{steps[page]}</p>
          <p className="form-progress-count">
            {page + 1} / {steps.length}
          </p>
        </div>

        <div
          className="form-progress-track"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={steps.length}
          aria-valuenow={page + 1}
          aria-label="Form progress"
        >
          <div className="form-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="form-progress-steps" role="tablist" aria-label="Form steps">
          {steps.map((item, index) => {
            const isActive = page === index;
            const isCompleted = page > index;

            return (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setPage(index)}
                className={`form-progress-step ${isActive ? "is-active" : ""} ${
                  isCompleted ? "is-completed" : ""
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
