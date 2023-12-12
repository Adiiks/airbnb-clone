package pl.adrian.airbnb.service;

import pl.adrian.airbnb.dto.ReservationRequest;

public interface ReservationService {

    void createReservation(ReservationRequest reservation);
}
