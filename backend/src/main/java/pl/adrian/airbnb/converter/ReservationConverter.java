package pl.adrian.airbnb.converter;

import org.springframework.stereotype.Component;
import pl.adrian.airbnb.dto.ReservationRequest;
import pl.adrian.airbnb.dto.ReservationResponse;
import pl.adrian.airbnb.entity.Reservation;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Component
public class ReservationConverter {

    public ReservationResponse reservationToReservationResponse(Reservation reservation) {
        return new ReservationResponse(
                reservation.getId(),
                reservation.getCheckInDate(),
                reservation.getCheckoutDate()
        );
    }

    public Reservation reservationRequestToReservation(ReservationRequest request) {
        return Reservation.builder()
                .totalGuests(request.totalGuests())
                .checkInDate(formatDateFromString(request.checkInDate()))
                .checkoutDate(formatDateFromString(request.checkoutDate()))
                .build();
    }

    private LocalDate formatDateFromString(String date) {
        return LocalDate.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }
}
