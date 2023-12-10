package pl.adrian.airbnb.dto;

public record ListingDetailsResponse(
        Integer maxGuests,
        Integer totalBedrooms,
        Integer totalBeds,
        Integer totalBathrooms
) {
}
