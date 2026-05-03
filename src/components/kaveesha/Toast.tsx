import { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
}

const CONFIG: Record<ToastType, { color: string; icon: string }> = {
  success: { color: "bg-yellow-700", icon: "✅" },
  error:   { color: "bg-red-500", icon: "❌" },
  info:    { color: "bg-yellow-600", icon: "💡" },
};

export default function Toast({ message, type = "info", onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show    = setTimeout(() => setVisible(true), 10);
    const dismiss = setTimeout(() => { setVisible(false); setTimeout(onClose, 300); }, 3300);
    return () => { clearTimeout(show); clearTimeout(dismiss); };
  }, [onClose]);

  function close() { setVisible(false); setTimeout(onClose, 300); }

  const { color, icon } = CONFIG[type];

  return (
    <div
      className={`
        fixed top-6 left-1/2 z-[9999]
        transition-all duration-300 ease-out
        ${visible
          ? "opacity-100 -translate-x-1/2 translate-y-0"
          : "opacity-0 -translate-x-1/2 -translate-y-3"}
      `}
    >
      <div className={`${color} text-white font-semibold pl-5 pr-4 py-3.5 rounded-full shadow-lg flex items-center gap-3 min-w-[240px] max-w-sm`}>
        <span className="text-xl shrink-0">{icon}</span>
        <span className="flex-1 text-sm leading-snug">{message}</span>
        <button
          onClick={close}
          className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white text-sm transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
