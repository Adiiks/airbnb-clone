import Address from "./Address";

export default interface Reservation {
    id?: number,
    checkInDate?: Date,
    checkoutDate?: Date,
    totalGuests?: number,
    totalPrice?: number,
    listingId?: number,
    imageUrl?: string,
    address?: Address
}