package pl.adrian.airbnb.dto;

import java.time.LocalDate;

public record ReservationResponse(
        Integer id,
        LocalDate checkInDate,
        LocalDate checkoutDate,
        Integer listingId,
        String imageUrl,
        AddressResponse address
) {
}
