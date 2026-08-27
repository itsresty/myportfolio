
"use client";

import { useState } from "react";
import { AlertTriangle, Loader2, X } from "lucide-react";

type ConfirmDialogProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "danger";
  onConfirm: () => void | Promise<void>;
  disabled?: boolean;
};

export default function ConfirmDialog({
  children,
  title = "Are you sure?",
  description = "Please confirm that you want to continue.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  onConfirm,
  disabled = false,
}: ConfirmDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const closeDialog = () => {
    if (!loading) {
      setOpen(false);
    }
  };

  return (
    <>
      {/* Trigger */}
      <span
        onClick={() => {
          if (!disabled) {
            setOpen(true);
          }
        }}
        className={disabled ? "pointer-events-none opacity-50" : ""}
      >
        {children}
      </span>

      {/* Dialog */}
      {open && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-dialog-title"
            className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 pb-4">
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    variant === "danger"
                      ? "bg-rose-100 text-rose-600"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  <AlertTriangle size={20} />
                </div>

                <div>
                  <h2
                    id="confirm-dialog-title"
                    className="text-lg font-bold text-slate-950"
                  >
                    {title}
                  </h2>

                  <p className="mt-1.5 text-sm leading-6 text-slate-500">
                    {description}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeDialog}
                disabled={loading}
                aria-label="Close"
                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={18} />
              </button>
            </div>

            {/* Actions */}
            <div className="flex gap-3 border-t border-slate-100 bg-slate-50 p-4">
              <button
                type="button"
                onClick={closeDialog}
                disabled={loading}
                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {cancelText}
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                disabled={loading}
                className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                  variant === "danger"
                    ? "bg-rose-600 hover:bg-rose-700"
                    : "bg-slate-950 hover:bg-slate-800"
                }`}
              >
                {loading && (
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                )}

                {loading ? "Please wait..." : confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

