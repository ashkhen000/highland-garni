import { ReactNode } from "react";
import { cn } from "@/lib/utils"; // or wherever your utility wrapper is located
import { Navbar } from "./Navbar"; // Adjust paths if necessary
import { Footer } from "./Footer"; // Adjust paths if necessary

export function PageLayout({
  children,
  hero,
  className,
}: {
  children: ReactNode;
  hero?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-h-screen bg-background text-foreground", className)}>
      <Navbar solid={!hero} />
      <main>
        {hero}
        {children}
      </main>
      <Footer />
    </div>
  );
}

// Added this missing export so AboutPage doesn't crash the Rollup bundler
export function PageHero({
  title,
  subtitle,
  eyebrow,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}) {
  return (
    <div className="page-hero py-16 md:py-24 text-center border-b border-border">
      <div className="container mx-auto px-4">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-3 text-muted-foreground max-w-md mx-auto">{subtitle}</p>}
      </div>
    </div>
  );
}
