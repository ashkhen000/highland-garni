// Reservation domain types — shared across components, services, and (future) admin panel.

export enum ReservationStatus {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
}

export interface ReservationInput {
  fullName: string;
  phone: string;
  email: string;
  guests: number;
  checkIn: string; // ISO date (YYYY-MM-DD)
  checkOut: string; // ISO date (YYYY-MM-DD)
  notes?: string;
}

export interface Reservation extends ReservationInput {
  id: string;
  status: ReservationStatus;
  createdAt: string; // ISO timestamp
  updatedAt?: string;
  reference: string; // human-friendly reservation reference, e.g. HG-2026-0001
}

/** Date range blocked because of a pending or approved reservation. */
export interface BlockedRange {
  from: string; // ISO date inclusive
  to: string;   // ISO date exclusive (checkout day frees the night)
  status: ReservationStatus.Pending | ReservationStatus.Approved;
}
