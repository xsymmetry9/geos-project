import { useEffect, useState } from "react";
import { Check, Copy, SquareX, CircleCheckBig } from "lucide-react";
import { useUser } from "@/context/UserContext";
import labelText from "@/assets/other/labelText.json";

type CloudLinkDialogProps = {
  cloudUrl: string;
  onClose: () => void;
};

const CloudLinkDialog = ({ cloudUrl, onClose }: CloudLinkDialogProps) => {
  const [copied, setCopied] = useState(false);
  const { user } = useUser();
  const language = user?.language ?? "english";
  const t = labelText[language];

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cloudUrl);
      setCopied(true);
    } catch (error) {
      console.error(error);
      // Fallback for older browsers / insecure contexts
      const textarea = document.createElement("textarea");
      textarea.value = cloudUrl;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]" onClick={onClose} />
      <div
        className="panel absolute top-1/2 left-1/2 z-10 w-[min(100%-2rem,28rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cloud-link-dialog-title"
      >
        <div className="flex w-full items-center justify-between bg-brand px-3 py-2">
          <p id="cloud-link-dialog-title" className="text-sm font-semibold text-white">
            {t.cloud_link_ready}
          </p>
          <button
            type="button"
            className="cursor-pointer rounded p-1 hover:bg-white/10"
            onClick={onClose}
            aria-label="Close"
          >
            <SquareX className="text-white" size={20} />
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 px-6 py-6">
          <CircleCheckBig size={44} className="text-brand" />
          <p className="text-center text-sm text-ink">{t.cloud_link_ready_message}</p>

          <div className="flex w-full items-stretch gap-2">
            <input
              type="text"
              readOnly
              value={cloudUrl}
              className="form-field min-w-0 flex-1 truncate text-xs"
              onFocus={(e) => e.currentTarget.select()}
              aria-label={t.cloud_link}
            />
            <button
              type="button"
              className="btn-primary inline-flex shrink-0 items-center gap-2 px-3"
              onClick={handleCopy}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? t.copied : t.copy_link}</span>
            </button>
          </div>

          <button type="button" className="btn-secondary w-full" onClick={onClose}>
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CloudLinkDialog;
