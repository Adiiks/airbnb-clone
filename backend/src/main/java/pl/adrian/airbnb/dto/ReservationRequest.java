package pl.adrian.airbnb.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record ReservationRequest(
        @NotBlank(message = "Check-in date is required")
        @Pattern(regexp = "^20\\d\\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$")
        String checkInDate,
        @NotBlank(message = "Checkout date is required")
        @Pattern(regexp = "^20\\d\\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$")
        String checkoutDate,
        @NotNull(message = "Total guests is required")
        @Min(value = 1, message = "At least one guest is required")
        Integer totalGuests,
        @NotNull(message = "Listing id is required")
        Integer listingId
) {

}
