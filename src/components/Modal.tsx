import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative bg-[var(--surface-color)] rounded-[var(--radius-xl)] shadow-[var(--shadow-xl)] max-w-3xl w-full max-h-[90vh] overflow-hidden fade-in border border-[var(--border-color)]">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[var(--primary-color)] to-[#667eea] px-6 py-5 flex justify-between items-center z-10 shadow-lg">
          <h2 className="text-2xl font-black text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-all hover:rotate-90 transform duration-300 p-2 hover:bg-white/10 rounded-lg"
            aria-label="Close"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 overflow-y-auto max-h-[calc(90vh-80px)] bg-[var(--background-color)]">
          {children}
        </div>
      </div>
    </div>
  );
};
