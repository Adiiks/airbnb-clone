package pl.adrian.airbnb.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import pl.adrian.airbnb.converter.ReservationConverter;
import pl.adrian.airbnb.dto.ReservationRequest;
import pl.adrian.airbnb.dto.ReservationResponse;
import pl.adrian.airbnb.entity.Listing;
import pl.adrian.airbnb.entity.Reservation;
import pl.adrian.airbnb.entity.User;
import pl.adrian.airbnb.repository.ListingRepository;
import pl.adrian.airbnb.repository.ReservationRepository;
import pl.adrian.airbnb.repository.UserRepository;
import pl.adrian.airbnb.security.AuthenticationFacade;

import java.time.LocalDate;
import java.util.List;

import static java.time.temporal.ChronoUnit.DAYS;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final ListingRepository listingRepository;
    private final ReservationConverter reservationConverter;
    private final AuthenticationFacade authenticationFacade;

    @Transactional
    @Override
    public void createReservation(ReservationRequest reservation) {
        Reservation newReservation = reservationConverter.reservationRequestToReservation(reservation);

        if (!isCheckInBeforeCheckout(newReservation.getCheckInDate(), newReservation.getCheckoutDate())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Check in date must be before checkout date");
        }

        User user = findUser(authenticationFacade.getUserEmail());

        Listing listing = findListing(reservation.listingId());

        if (reservationRepository.existsByListingAndDates(listing.getId(), newReservation.getCheckInDate(),
                newReservation.getCheckoutDate())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Dates are already taken");
        }

        if (listing.getListingDetails().getMaxGuests() < reservation.totalGuests()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Listing don't allow that many guests");
        }

        Integer totalPrice = calculateTotalPrice(listing.getPrice(), newReservation.getCheckInDate(),
                newReservation.getCheckoutDate());

        newReservation.setTotalPrice(totalPrice);
        newReservation.setMadeByUser(user);
        newReservation.setListing(listing);

        reservationRepository.save(newReservation);
    }

    @Override
    public List<ReservationResponse> getUserReservations() {
        String userEmail = authenticationFacade.getUserEmail();

        return reservationRepository.findByMadeByUser_Email(userEmail)
                .stream()
                .map(reservationConverter::reservationToReservationResponse)
                .toList();
    }

    @Transactional
    @Override
    public void cancelReservation(Integer reservationId) {
        String userEmail = authenticationFacade.getUserEmail();
        Reservation reservation = reservationRepository.findByIdAndMadeByUser_Email(reservationId, userEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Reservation not found"));

        reservation.getListing().removeReservation(reservation);

        reservationRepository.delete(reservation);
    }

    private Integer calculateTotalPrice(Integer price, LocalDate checkInDate, LocalDate checkoutDate) {
        long days = DAYS.between(checkInDate, checkoutDate);
        return (int) (days * price);
    }

    private boolean isCheckInBeforeCheckout(LocalDate checkIn, LocalDate checkout) {
        return !checkIn.isAfter(checkout) && !checkIn.isEqual(checkout);
    }

    private User findUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "User with email: " + email + " not found"));
    }

    private Listing findListing(Integer id) {
        return listingRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Listing with id: " + id + " not found"));
    }
}
