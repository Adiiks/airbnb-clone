package pl.adrian.airbnb.data;

import pl.adrian.airbnb.dto.ReservationRequest;
import pl.adrian.airbnb.entity.Reservation;

import java.time.LocalDate;

public class ReservationDataBuilder {

    public static Reservation buildReservation() {
        return Reservation.builder()
                .id(1)
                .checkInDate(LocalDate.now())
                .checkoutDate(LocalDate.now().plusDays(2))
                .listing(ListingDataBuilder.buildListing())
                .madeByUser(UserDataBuilder.buildUser())
                .totalGuests(3)
                .totalPrice(1565)
                .build();
    }

    public static ReservationRequest buildInvalidReservationRequest() {
        return new ReservationRequest(
          "11-12-2023",
          "31312013221312-1321321-1231231",
          0,
          null
        );
    }

    public static ReservationRequest buildReservationRequest() {
        return new ReservationRequest(
                "2023-12-11",
                "2023-12-15",
                3,
                1
        );
    }
}
