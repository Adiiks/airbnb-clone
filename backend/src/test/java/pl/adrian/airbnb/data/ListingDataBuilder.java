package pl.adrian.airbnb.data;

import pl.adrian.airbnb.dto.AddressRequest;
import pl.adrian.airbnb.dto.ListingDetailsRequest;
import pl.adrian.airbnb.dto.ListingRequest;
import pl.adrian.airbnb.entity.Address;
import pl.adrian.airbnb.entity.Listing;
import pl.adrian.airbnb.entity.ListingDetails;

import java.util.HashSet;

public class ListingDataBuilder {

    public static ListingRequest buildListingRequest() {
        return new ListingRequest(
                1,
                buildAddressRequest(),
                buildListingDetailsRequest(),
                "My listing",
                "Listing description",
                45
                );
    }

    public static ListingRequest buildListingRequestInvalid() {
        return new ListingRequest(
                null,
                buildAddressRequestInvalid(),
                buildListingDetailsRequestInvalid(),
                "Mylistinsadsadsadadsadadsadadadsadadadsadsadasglistinsadsadsadadsadadsadadadsadadadsadsadas",
                "",
                10
        );
    }

    public static AddressRequest buildAddressRequest() {
        return new AddressRequest(
                "Poland",
                "ul. Polna 10",
                "62-303",
                "Warsaw"
        );
    }

    public static AddressRequest buildAddressRequestInvalid() {
        return new AddressRequest(
                "",
                "",
                "",
                ""
        );
    }

    public static ListingDetailsRequest buildListingDetailsRequest() {
        return new ListingDetailsRequest(1, 1, 1, 1);
    }

    public static ListingDetailsRequest buildListingDetailsRequestInvalid() {
        return new ListingDetailsRequest(0, null, 0, 0);
    }

    public static Listing buildListing() {
        return Listing.builder()
                .description("some description")
                .title("title")
                .price(234)
                .listingDetails(buildListingDetails())
                .address(buildAddress())
                .owner(UserDataBuilder.buildUser())
                .category(CategoryDataBuilder.buildCategory())
                .imageUrl("http://cloudinary/image.png")
                .id(1)
                .usersWhoAddedToWishlist(new HashSet<>())
                .build();
    }

    public static ListingDetails buildListingDetails() {
        return ListingDetails.builder()
                .maxGuests(4)
                .totalBeds(2)
                .totalBedrooms(2)
                .totalBathrooms(2)
                .id(1)
                .build();
    }

    public static Address buildAddress() {
        return Address.builder()
                .postalCode("21-321")
                .country("Poland")
                .streetAddress("Polna 12")
                .city("Warsaw")
                .id(1)
                .build();
    }
}
