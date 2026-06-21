import { useEffect, useState } from "react";
import { fetchBlockedRanges } from "@/services/reservationService";
import { flattenBlockedDates } from "@/utils/dateUtils";

/**
 * React hook returning unavailable Date objects (pending + approved reservations).
 * Wired to the reservation service — switches automatically once Firebase is enabled.
 */
export function useBlockedDates() {
  const [dates, setDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = async () => {
    try {
      setLoading(true);
      const ranges = await fetchBlockedRanges();
      setDates(flattenBlockedDates(ranges));
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  return { dates, loading, error, refresh };
}
