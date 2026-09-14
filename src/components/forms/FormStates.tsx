import { CheckCircle2, AlertTriangle } from "lucide-react";

export function FormSuccessState({ message }: { message: string }) {
  return (
    <div
      role="status"
      className="flex items-start gap-3 border rule rounded-[4px] p-5 bg-[var(--color-success-soft)] text-[var(--color-success)]"
    >
      <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
      <p className="text-sm">{message}</p>
    </div>
  );
}

export function FormErrorState({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 border rule rounded-[4px] p-5 bg-[var(--color-danger-soft)] text-[var(--color-danger)]"
    >
      <AlertTriangle size={18} className="mt-0.5 shrink-0" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
