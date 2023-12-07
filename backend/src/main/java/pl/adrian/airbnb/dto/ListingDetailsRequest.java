package pl.adrian.airbnb.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record ListingDetailsRequest(
        @NotNull(message = "Max guests is required")
        @Min(value = 1, message = "Must be at least one guest")
        Integer maxGuests,

        @NotNull(message = "Total bedrooms is required")
        Integer totalBedrooms,

        @NotNull(message = "Total beds is required")
        @Min(value = 1, message = "Must be at least one bed")
        Integer totalBeds,

        @NotNull(message = "Total bathrooms is required")
        @Min(value = 1, message = "Must be at least one bathroom")
        Integer totalBathrooms
) {
}
