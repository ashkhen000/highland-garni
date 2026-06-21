export function AdminPlaceholder() {
  return (
    <div className="flex min-h-svh items-center justify-center px-6 text-center">
      <div>
        <p className="eyebrow">Highland Garni</p>
        <h1 className="mt-3 text-4xl md:text-5xl">Admin dashboard</h1>
        <p className="mt-4 max-w-md text-sm text-muted-foreground">
          Coming soon. Reservation management hooks are already in place — see
          <code className="mx-1">src/services/reservationService.ts</code>.
        </p>
      </div>
    </div>
  );
}
