import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"; // Swapped import here
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useBlockedDates } from "@/hooks/useBlockedDates";
import { createReservation } from "@/services/reservationService";
import { isRangeAvailable, toISODate } from "@/utils/dateUtils";
import { reservationSchema } from "@/utils/validation";
import { format } from "date-fns";

export function Reservation() {
  const { t } = useTranslation();
  const navigate = useNavigate(); // Using React Router's navigation hook
  const { dates: blocked, refresh } = useBlockedDates();
  const [range, setRange] = useState<DateRange | undefined>();
  const [submitting, setSubmitting] = useState(false);

  const disabledDays = useMemo(
    () => [{ before: new Date() }, ...blocked.map((d) => d)],
    [blocked],
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = reservationSchema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      toast.error(t(parsed.error.issues[0].message));
      return;
    }
    if (!range?.from || !range?.to) {
      toast.error(t("reserve.pickDate"));
      return;
    }
    if (range.to <= range.from) {
      toast.error(t("reserve.errorInvalid"));
      return;
    }
    if (!isRangeAvailable(range.from, range.to, blocked)) {
      toast.error(t("reserve.errorRange"));
      return;
    }

    try {
      setSubmitting(true);
      const reservation = await createReservation({
        ...parsed.data,
        notes: parsed.data.notes || undefined,
        checkIn: toISODate(range.from),
        checkOut: toISODate(range.to),
      });
      await refresh();
      toast.success(t("reserve.success"));
      
      // Converted native URL string route syntax with search parameters
      navigate(`/reservation-success?ref=${encodeURIComponent(reservation.reference)}`);
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  const dateLabel = range?.from
    ? range.to
      ? `${format(range.from, "MMM d")} — ${format(range.to, "MMM d, yyyy")}`
      : format(range.from, "MMM d, yyyy")
    : t("reserve.pickDate");

  return (
    <section id="reserve" className="relative border-t border-border/60 py-24 md:py-32">
      <div className="container-px mx-auto max-w-5xl">
        <div className="text-center">
          <p className="eyebrow">{t("reserve.eyebrow")}</p>
          <h2 className="mt-3 text-4xl md:text-6xl">{t("reserve.title")}</h2>
          <p className="mt-4 text-sm text-muted-foreground">{t("reserve.subtitle")}</p>
        </div>

        <form onSubmit={onSubmit} className="mt-14 space-y-6 border border-border bg-card p-6 md:p-10">
          <div className="grid gap-6 md:grid-cols-2">
            <Field label={t("reserve.fullName")}>
              <Input name="fullName" required maxLength={120} autoComplete="name" />
            </Field>
            <Field label={t("reserve.phone")}>
              <Input name="phone" required maxLength={32} type="tel" autoComplete="tel" />
            </Field>
            <Field label={t("reserve.email")}>
              <Input name="email" required maxLength={254} type="email" autoComplete="email" />
            </Field>
            <Field label={t("reserve.guests")}>
              <Input name="guests" required type="number" min={1} max={12} defaultValue={2} />
            </Field>

            <Field label={`${t("reserve.checkIn")} → ${t("reserve.checkOut")}`} className="md:col-span-2">
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="flex h-11 w-full items-center justify-between rounded-sm border border-input bg-background px-3 text-left text-sm"
                  >
                    <span className={range?.from ? "" : "text-muted-foreground"}>{dateLabel}</span>
                    <CalendarIcon className="h-4 w-4 opacity-60" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                  <DayPicker
                    mode="range"
                    selected={range}
                    onSelect={setRange}
                    disabled={disabledDays}
                    numberOfMonths={1}
                    className="p-3"
                  />
                </PopoverContent>
              </Popover>
            </Field>

            <Field label={t("reserve.notes")} className="md:col-span-2">
              <Textarea name="notes" maxLength={1000} rows={4} />
            </Field>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-foreground px-8 py-4 text-xs uppercase tracking-[0.28em] text-background transition-opacity disabled:opacity-60"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {submitting ? t("reserve.submitting") : t("reserve.submit")}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
