import Address from "./Address";
import ListingBasicInfo from "./ListingBasicInfo";

export default interface Listing {
    id?: number,
    categoryId?: number,
    address: Address,
    listingDetails: ListingBasicInfo,
    title: string,
    description: string,
    price: number
    imageUrl?: string
}