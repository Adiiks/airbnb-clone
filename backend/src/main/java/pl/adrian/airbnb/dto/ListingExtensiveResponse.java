package pl.adrian.airbnb.dto;

public record ListingExtensiveResponse(
        Integer id,
        String imageUrl,
        String title,
        String description,
        ListingDetailsResponse listingDetails,
        String ownerName,
        AddressResponse address,
        Integer price
) {
}
