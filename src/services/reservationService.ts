/**
 * Reservation service — Firebase-ready.
 *
 * All Firestore code is commented out. When Firebase is enabled
 * (`src/firebase/config.ts`), uncomment the marked sections and remove the
 * in-memory fallback at the bottom of each function.
 */

import {
  type Reservation,
  type ReservationInput,
  type BlockedRange,
  ReservationStatus,
} from "@/types/reservation";

// import {
//   collection, addDoc, getDocs, query, where, doc, updateDoc,
//   serverTimestamp, Timestamp,
// } from "firebase/firestore";
// import { db } from "@/firebase/config";

const RESERVATIONS_COLLECTION = "reservations";

/** Local in-memory store used until Firebase is enabled. */
const _localReservations: Reservation[] = [];

function generateReference(): string {
  const year = new Date().getFullYear();
  const seq = String(_localReservations.length + 1).padStart(4, "0");
  return `HG-${year}-${seq}`;
}

/**
 * Create a new reservation with status = pending.
 * Pending dates immediately block availability.
 */
export async function createReservation(input: ReservationInput): Promise<Reservation> {
  const reservation: Reservation = {
    ...input,
    id: crypto.randomUUID(),
    status: ReservationStatus.Pending,
    createdAt: new Date().toISOString(),
    reference: generateReference(),
  };

  // ── Firebase: uncomment when enabled ─────────────────────────────────────
  // const ref = await addDoc(collection(db, RESERVATIONS_COLLECTION), {
  //   ...input,
  //   status: ReservationStatus.Pending,
  //   createdAt: serverTimestamp(),
  //   reference: reservation.reference,
  // });
  // reservation.id = ref.id;
  // ─────────────────────────────────────────────────────────────────────────

  _localReservations.push(reservation);
  return reservation;
}

/**
 * Fetch all date ranges that are unavailable (pending OR approved).
 * Rejected reservations are intentionally excluded so dates become free again.
 */
export async function fetchBlockedRanges(): Promise<BlockedRange[]> {
  // ── Firebase: uncomment when enabled ─────────────────────────────────────
  // const q = query(
  //   collection(db, RESERVATIONS_COLLECTION),
  //   where("status", "in", [ReservationStatus.Pending, ReservationStatus.Approved]),
  // );
  // const snap = await getDocs(q);
  // return snap.docs.map((d) => {
  //   const data = d.data();
  //   return {
  //     from: data.checkIn,
  //     to: data.checkOut,
  //     status: data.status,
  //   } satisfies BlockedRange;
  // });
  // ─────────────────────────────────────────────────────────────────────────

  return _localReservations
    .filter((r) => r.status !== ReservationStatus.Rejected)
    .map((r) => ({
      from: r.checkIn,
      to: r.checkOut,
      status: r.status as BlockedRange["status"],
    }));
}

/**
 * Admin: update reservation status. Approved & pending block dates;
 * rejected frees them up.
 */
export async function updateReservationStatus(
  id: string,
  status: ReservationStatus,
): Promise<void> {
  // ── Firebase: uncomment when enabled ─────────────────────────────────────
  // await updateDoc(doc(db, RESERVATIONS_COLLECTION, id), {
  //   status,
  //   updatedAt: serverTimestamp(),
  // });
  // ─────────────────────────────────────────────────────────────────────────

  const r = _localReservations.find((x) => x.id === id);
  if (r) {
    r.status = status;
    r.updatedAt = new Date().toISOString();
  }
}

/** Admin: fetch all reservations (for the future admin dashboard). */
export async function fetchAllReservations(): Promise<Reservation[]> {
  // ── Firebase: uncomment when enabled ─────────────────────────────────────
  // const snap = await getDocs(collection(db, RESERVATIONS_COLLECTION));
  // return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Reservation, "id">) }));
  // ─────────────────────────────────────────────────────────────────────────
  return [..._localReservations];
}
