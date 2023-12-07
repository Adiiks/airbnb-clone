package pl.adrian.airbnb.data;

import pl.adrian.airbnb.dto.AddressRequest;
import pl.adrian.airbnb.dto.ListingDetailsRequest;
import pl.adrian.airbnb.dto.ListingRequest;

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
}
