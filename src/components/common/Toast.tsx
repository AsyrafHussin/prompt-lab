
import { useEffect } from 'react';
import { clsx } from 'clsx';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import type { Toast as ToastType } from '../../types';

export function ToastContainer() {
  const toasts = useUIStore((state) => state.toasts);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
}

interface ToastProps {
  toast: ToastType;
}

function Toast({ toast }: ToastProps) {
  const removeToast = useUIStore((state) => state.removeToast);

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, 4000);

    return () => clearTimeout(timer);
  }, [toast.id, removeToast]);

  const Icon = toast.type === 'success' ? CheckCircle : toast.type === 'error' ? XCircle : Info;

  return (
    <div
      className={clsx(
        'flex items-start gap-3 p-4 rounded-lg shadow-lg backdrop-blur-sm border animate-slide-in',
        {
          'bg-green-900/90 border-green-700 text-green-100': toast.type === 'success',
          'bg-red-900/90 border-red-700 text-red-100': toast.type === 'error',
          'bg-blue-900/90 border-blue-700 text-blue-100': toast.type === 'info',
        }
      )}
    >
      <Icon size={20} className="flex-shrink-0 mt-0.5" />
      <p className="flex-1 text-sm">{toast.message}</p>
      <button
        onClick={() => removeToast(toast.id)}
        className="flex-shrink-0 opacity-70 hover:opacity-100 transition-smooth"
      >
        <X size={16} />
      </button>
    </div>
  );
}
