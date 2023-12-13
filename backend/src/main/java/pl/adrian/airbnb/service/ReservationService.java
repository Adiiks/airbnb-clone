package pl.adrian.airbnb.service;

import pl.adrian.airbnb.dto.ReservationRequest;
import pl.adrian.airbnb.dto.ReservationResponse;

import java.util.List;

public interface ReservationService {

    void createReservation(ReservationRequest reservation);

    List<ReservationResponse> getUserReservations();

    void cancelReservation(Integer reservationId);
}
