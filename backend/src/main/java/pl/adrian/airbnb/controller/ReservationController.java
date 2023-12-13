package pl.adrian.airbnb.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.adrian.airbnb.dto.ReservationRequest;
import pl.adrian.airbnb.dto.ReservationResponse;
import pl.adrian.airbnb.service.ReservationService;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @PreAuthorize("isAuthenticated()")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createReservation(@Valid @RequestBody ReservationRequest reservation) {
        reservationService.createReservation(reservation);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public List<ReservationResponse> getUserReservations() {
        return reservationService.getUserReservations();
    }

    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/{reservationId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void cancelReservation(@PathVariable Integer reservationId) {
        reservationService.cancelReservation(reservationId);
    }
}
