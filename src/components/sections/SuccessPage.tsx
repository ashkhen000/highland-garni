import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CheckCircle2 } from "lucide-react";

export function SuccessPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const ref = searchParams.get("ref");

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background px-6 text-center">
      <CheckCircle2 className="h-12 w-12 stroke-[1.25]" />
      <p className="eyebrow mt-8">Highland Garni</p>
      <h1 className="mt-3 max-w-2xl text-4xl md:text-6xl">{t("successPage.title")}</h1>
      <p className="mt-5 max-w-lg text-sm text-muted-foreground md:text-base">
        {t("successPage.subtitle")}
      </p>

      <div className="mt-10 border border-border px-8 py-6">
        <div className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
          {t("successPage.reference")}
        </div>
        <div className="mt-2 font-display text-3xl tracking-wider">{ref ?? "HG-—"}</div>
      </div>

      <Link
        to="/"
        className="mt-12 inline-flex items-center justify-center rounded-sm border border-foreground/80 px-8 py-4 text-xs uppercase tracking-[0.28em] hover:bg-foreground hover:text-background"
      >
        {t("successPage.back")}
      </Link>
    </div>
  );
}
