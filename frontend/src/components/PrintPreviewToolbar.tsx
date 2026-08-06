import { ReactNode } from "react";

export const printToolbarSegmentClass =
  "inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 whitespace-nowrap px-3 py-2 text-sm font-semibold capitalize transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-inset sm:px-4";

export const printToolbarMutedClass = `${printToolbarSegmentClass} bg-surface text-muted hover:bg-brand-soft hover:text-brand`;

export const printToolbarActionClass = `${printToolbarSegmentClass} bg-brand text-white hover:bg-brand-dark`;

export const printToolbarExtractClass = `${printToolbarActionClass} disabled:cursor-not-allowed disabled:opacity-60`;

type PrintPreviewToolbarProps = {
  /** Max width of the toolbar row (e.g. 210mm portrait / 297mm landscape) */
  maxWidthClass: string;
  children: ReactNode;
};

/** Shared segmented Print / Extract toolbar chrome used by SPR and Level Check previews. */
const PrintPreviewToolbar = ({ maxWidthClass, children }: PrintPreviewToolbarProps) => (
  <div className={`mx-auto w-full ${maxWidthClass} px-4 pt-5 pb-3`}>
    <div className="flex justify-end">
      <div className="inline-flex overflow-hidden rounded-xl border border-line bg-white shadow-sm">
        <div className="flex divide-x divide-line">{children}</div>
      </div>
    </div>
  </div>
);

export default PrintPreviewToolbar;
