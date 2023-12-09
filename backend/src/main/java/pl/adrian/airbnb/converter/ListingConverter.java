package pl.adrian.airbnb.converter;

import org.springframework.stereotype.Component;
import pl.adrian.airbnb.dto.*;
import pl.adrian.airbnb.entity.Address;
import pl.adrian.airbnb.entity.Listing;
import pl.adrian.airbnb.entity.ListingDetails;

@Component
public class ListingConverter {

    public Listing convertListingRequestToListing(ListingRequest listingRequest) {
        return Listing.builder()
                .listingDetails(convertListingDetailsRequestToListingDetails(listingRequest.listingDetails()))
                .address(convertAddressRequestToAddress(listingRequest.address()))
                .price(listingRequest.price())
                .title(listingRequest.title())
                .description(listingRequest.description())
                .build();
    }

    public ListingResponse convertListingToListingResponse(Listing listing, boolean isOnUserWishlist) {
        return new ListingResponse(
                listing.getId(),
                listing.getImageUrl(),
                convertAddressToAddressResponse(listing.getAddress()),
                extractOwnerNameFromFullName(listing.getOwner().getFullName()),
                listing.getPrice(),
                isOnUserWishlist
        );
    }

    public Address convertAddressRequestToAddress(AddressRequest addressRequest) {
        return Address.builder()
                .city(addressRequest.city())
                .streetAddress(addressRequest.streetAddress())
                .country(addressRequest.country())
                .postalCode(addressRequest.postalCode())
                .build();
    }

    public AddressResponse convertAddressToAddressResponse(Address address) {
        return new AddressResponse(
                address.getCountry(),
                address.getCity()
        );
    }

    public ListingDetails convertListingDetailsRequestToListingDetails(ListingDetailsRequest listingDetailsRequest) {
        return ListingDetails.builder()
                .totalBathrooms(listingDetailsRequest.totalBathrooms())
                .totalBedrooms(listingDetailsRequest.totalBedrooms())
                .totalBeds(listingDetailsRequest.totalBeds())
                .maxGuests(listingDetailsRequest.maxGuests())
                .build();
    }

    private String extractOwnerNameFromFullName(String fullName) {
        int nameEndIndex = fullName.indexOf(" ");

        if (nameEndIndex == -1) return fullName;

        return fullName.substring(0, nameEndIndex);
    }
}
