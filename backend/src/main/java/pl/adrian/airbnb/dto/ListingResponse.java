package pl.adrian.airbnb.dto;

public record ListingResponse(
        Integer id,
        String imageUrl,
        AddressResponse address,
        String ownerName,
        Integer price
) {
}
