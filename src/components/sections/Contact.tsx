import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Mail, MapPin, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema } from "@/utils/validation";

export function Contact() {
  const { t } = useTranslation();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = contactSchema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      toast.error(t(parsed.error.issues[0].message));
      return;
    }
    // TODO: wire to Firebase / email service when enabled.
    toast.success(t("contact.sent"));
    e.currentTarget.reset();
  }

  return (
    <section id="contact" className="relative border-t border-border/60 py-24 md:py-32">
      <div className="container-px mx-auto grid max-w-7xl gap-14 md:grid-cols-2">
        <div>
          <p className="eyebrow">{t("contact.eyebrow")}</p>
          <h2 className="mt-3 text-4xl md:text-6xl">{t("contact.title")}</h2>

          <ul className="mt-12 space-y-5 text-sm">
            <li className="flex items-start gap-4">
              <Phone className="mt-1 h-4 w-4 stroke-[1.25]" />
              <div>
                <div className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  {t("contact.phone")}
                </div>
                <a href="tel:+37499000000" className="hover:underline">+374 94 14 15 15</a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Mail className="mt-1 h-4 w-4 stroke-[1.25]" />
              <div>
                <div className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  {t("contact.emailLabel")}
                </div>
                <a href="mailto:stay@highlandgarni.am" className="hover:underline">
                  stay@highlandgarni.am
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <MapPin className="mt-1 h-4 w-4 stroke-[1.25]" />
              <div>
                <div className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  {t("contact.address")}
                </div>
                <span>Garni, Armenia</span>
              </div>
            </li>
          </ul>

          <div className="mt-10 aspect-[16/9] w-full overflow-hidden border border-border">
            {/* Google Maps placeholder — drop in an <iframe> embed when ready. */}
            <iframe
              title="Highland Garni location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=44.72%2C40.10%2C44.78%2C40.13&layer=mapnik&marker=40.115%2C44.73"
              className="h-full w-full grayscale"
              loading="lazy"
            />
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-6 border border-border bg-card p-6 md:p-10">
          <Field label={t("contact.name")}>
            <Input name="name" required maxLength={120} />
          </Field>
          <Field label={t("contact.email")}>
            <Input name="email" required type="email" maxLength={254} />
          </Field>
          <Field label={t("contact.message")}>
            <Textarea name="message" required rows={6} maxLength={2000} />
          </Field>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-sm bg-foreground px-8 py-4 text-xs uppercase tracking-[0.28em] text-background"
          >
            {t("contact.send")}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
