import { useTranslation } from "react-i18next";
import {
  Waves,
  Wifi,
  CarFront,
  Snowflake,
  Flame,
  ChefHat,
  Mountain,
  Users,
  type LucideIcon,
} from "lucide-react";

const items: { key: string; Icon: LucideIcon }[] = [
  { key: "pool", Icon: Waves },
  { key: "wifi", Icon: Wifi },
  { key: "parking", Icon: CarFront },
  { key: "ac", Icon: Snowflake },
  { key: "bbq", Icon: Flame },
  { key: "kitchen", Icon: ChefHat },
  { key: "view", Icon: Mountain },
  { key: "family", Icon: Users },
];

export function Amenities() {
  const { t } = useTranslation();
  return (
    <section id="amenities" className="relative border-t border-border/60 py-24 md:py-32">
      <div className="container-px mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="eyebrow">{t("amenities.eyebrow")}</p>
          <h2 className="mt-3 text-4xl md:text-6xl">{t("amenities.title")}</h2>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-px bg-border md:grid-cols-4">
          {items.map(({ key, Icon }) => (
            <li
              key={key}
              className="group flex aspect-square flex-col items-start justify-between bg-background p-6 transition-colors hover:bg-card md:p-8"
            >
              <Icon className="h-7 w-7 stroke-[1.25] transition-transform group-hover:-translate-y-1" />
              <span className="text-sm md:text-base">{t(`amenities.${key}`)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
