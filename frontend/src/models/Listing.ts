import Address from "./Address";
import ListingBasicInfo from "./ListingBasicInfo";
import Reservation from "./Reservation";

export default interface Listing {
    id?: number,
    categoryId?: number,
    address: Address,
    listingDetails: ListingBasicInfo,
    title: string,
    description: string,
    price: number
    imageUrl?: string,
    ownerName?: string,
    isOnUserWishlist?: boolean,
    reservations?: Reservation[]
}