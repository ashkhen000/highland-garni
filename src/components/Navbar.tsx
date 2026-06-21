import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

const sections = [
  { key: "gallery", to: "/gallery" },
  { key: "about", to: "/about" },
  { key: "amenities", to: "/amenities" },
  { key: "reserve", to: "/reserve" },
  { key: "contact", to: "/contact" },
] as const;

export function Navbar({ solid = false }: { solid?: boolean }) {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = solid || scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        dark
          ? "bg-background/80 backdrop-blur-xl border-b border-border/60"
          : "bg-transparent",
      )}
    >
      <nav className="container-px mx-auto flex h-16 max-w-7xl items-center justify-between md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <span
            className={cn(
              "font-display text-lg tracking-tight md:text-xl",
              !dark && "text-white",
            )}
          >
            Highland<span className={cn(dark ? "text-muted-foreground" : "text-white/60")}> · </span>Garni
          </span>
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {sections.map((s) => (
            <li key={s.key}>
              <NavLink
                to={s.to}
                className={({ isActive }) =>
                  cn(
                    "text-xs uppercase tracking-[0.22em] transition-colors",
                    dark
                      ? isActive
                        ? "text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground"
                      : isActive
                        ? "text-white font-medium"
                        : "text-white/70 hover:text-white",
                  )
                }
              >
                {t(`nav.${s.key}`)}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LanguageSwitcher
            className={cn(!dark && "text-white/70 hover:text-white")}
          />
          <Link
            to="/reserve"
            className={cn(
              "hidden rounded-sm border px-4 py-2 text-xs uppercase tracking-[0.22em] transition-colors md:inline-block",
              dark
                ? "border-foreground/80 hover:bg-foreground hover:text-background"
                : "border-white/80 text-white hover:bg-white hover:text-black",
            )}
          >
            {t("nav.reserve")}
          </Link>
          <button
            aria-label="Menu"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center md:hidden",
              !dark && "text-white",
            )}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl">
          <ul className="container-px mx-auto flex flex-col gap-4 py-6">
            {sections.map((s) => (
              <li key={s.key}>
                <Link
                  to={s.to}
                  onClick={() => setOpen(false)}
                  className="block text-sm uppercase tracking-[0.22em] text-muted-foreground"
                >
                  {t(`nav.${s.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
