package pl.adrian.airbnb.dto;

import jakarta.validation.constraints.Pattern;

public record ListingFilterDTO(
        String country,
        @Pattern(regexp = "^20\\d\\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$")
        String checkInDate,
        @Pattern(regexp = "^20\\d\\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$")
        String checkoutDate,
        Integer totalGuests
) {
}
