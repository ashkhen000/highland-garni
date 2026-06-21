import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom"; // Swapped to react-router-dom
import { Instagram, Facebook, Send } from "lucide-react";

const navLinks = [
  { key: "gallery", to: "/gallery" },
  { key: "about", to: "/about" },
  { key: "amenities", to: "/amenities" },
  { key: "reserve", to: "/reserve" },
  { key: "contact", to: "/contact" },
] as const;

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border/60 bg-gradient-to-b from-card to-background">
      <div className="container-px mx-auto max-w-7xl py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="font-display text-2xl">Highland Garni</div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">{t("footer.tagline")}</p>
          </div>
          <div>
            <h3 className="eyebrow">{t("footer.navigate")}</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {navLinks.map((s) => (
                <li key={s.key}>
                  <Link to={s.to} className="text-muted-foreground hover:text-foreground">
                    {t(`nav.${s.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="eyebrow">{t("footer.contact")}</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Garni, Armenia</li>
              <li>stay@highlandgarni.am</li>
              <li>+374 94 14 15 15</li>
            </ul>
          </div>
          <div>
            <h3 className="eyebrow">{t("footer.follow")}</h3>
            <div className="mt-4 flex gap-3">
              {[Instagram, Facebook, Send].map((Icon, i) => (
                <a
                  key={i}
                  href="https://www.instagram.com/highlandhills.arm"
                  aria-label="social"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-foreground hover:text-background"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-border pt-6 text-[10px] uppercase tracking-[0.24em] text-muted-foreground md:flex-row">
          <span>© {year} Highland Garni </span>
          <span>Garni · Armenia</span>
        </div>
      </div>
    </footer>
  );
}
