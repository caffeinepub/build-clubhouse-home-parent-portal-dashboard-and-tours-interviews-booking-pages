import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface BookingInput {
    contact: ParentContact;
    notes: string;
    details: string;
    requestedTime: Time;
}
export interface ParentContact {
    name: string;
    email: string;
}
export interface UserProfile {
    name: string;
    email: string;
    phone: string;
}
export interface Request {
    id: bigint;
    status: Status;
    contact: ParentContact;
    notes: string;
    timestamp: Time;
    details: string;
    requestedTime: Time;
    parent: Principal;
}
export enum Status {
    cancelled = "cancelled",
    pending = "pending",
    completed = "completed",
    confirmed = "confirmed"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createBookingRequest(input: BookingInput): Promise<bigint>;
    getBookingById(id: bigint): Promise<Request>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listAllBookings(): Promise<Array<Request>>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateBookingStatus(id: bigint, status: Status): Promise<void>;
}
