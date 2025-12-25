import { X } from "lucide-react";

interface SocialProofToastProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

export default function SocialProofToast({ show, message, onClose }: SocialProofToastProps) {
  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-right fade-in duration-300">
      <div className="bg-white border border-primary/20 rounded-lg shadow-xl px-4 py-3 flex items-center gap-3 max-w-sm">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        <p className="text-sm text-gray-700 flex-1">
          <span className="font-semibold text-primary">{message}</span>
        </p>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

