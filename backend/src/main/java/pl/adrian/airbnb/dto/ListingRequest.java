package pl.adrian.airbnb.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public record ListingRequest(
        @NotNull(message = "Category id is required")
        Integer categoryId,

        @NotNull(message = "Address is required")
        @Valid
        AddressRequest address,

        @NotNull(message = "Listing details is required")
        @Valid
        ListingDetailsRequest listingDetails,

        @NotBlank(message = "Title is required")
        @Length(max = 32, message = "Title can only have 32 characters max")
        String title,

        @NotBlank(message = "Description is required")
        @Length(max = 500, message = "Description can only have 32 characters max")
        String description,

        @NotNull(message = "Price is required")
        @Min(value = 40, message = "Minimum price is 40")
        @Max(value = 39989, message = "Maximum price is 39,989")
        Integer price
) {
}
