package pl.adrian.airbnb.dto;

import jakarta.validation.constraints.NotBlank;

public record AddressRequest(
        @NotBlank(message = "Country is required")
        String country,

        @NotBlank(message = "Street address is required")
        String streetAddress,

        @NotBlank(message = "Postal code is required")
        String postalCode,

        @NotBlank(message = "City is required")
        String city
) {
}
