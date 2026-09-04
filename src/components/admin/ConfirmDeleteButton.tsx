"use client";

export function ConfirmDeleteButton({
  action,
  confirmMessage,
  label = "حذف",
  className = "text-sm text-maroon-700 hover:underline",
}: {
  action: () => void;
  confirmMessage: string;
  label?: string;
  className?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm(confirmMessage)) {
          event.preventDefault();
        }
      }}
    >
      <button type="submit" className={className}>
        {label}
      </button>
    </form>
  );
}
