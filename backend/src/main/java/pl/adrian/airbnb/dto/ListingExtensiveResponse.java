package pl.adrian.airbnb.dto;

import java.util.List;

public record ListingExtensiveResponse(
        Integer id,
        String imageUrl,
        String title,
        String description,
        ListingDetailsResponse listingDetails,
        String ownerName,
        AddressResponse address,
        Integer price,
        List<ReservationResponse> reservations
) {
}
