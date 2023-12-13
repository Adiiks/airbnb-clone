package pl.adrian.airbnb.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;
import pl.adrian.airbnb.converter.ReservationConverter;
import pl.adrian.airbnb.data.ListingDataBuilder;
import pl.adrian.airbnb.data.ReservationDataBuilder;
import pl.adrian.airbnb.data.UserDataBuilder;
import pl.adrian.airbnb.dto.ReservationRequest;
import pl.adrian.airbnb.dto.ReservationResponse;
import pl.adrian.airbnb.entity.Listing;
import pl.adrian.airbnb.entity.Reservation;
import pl.adrian.airbnb.entity.User;
import pl.adrian.airbnb.repository.ListingRepository;
import pl.adrian.airbnb.repository.ReservationRepository;
import pl.adrian.airbnb.repository.UserRepository;
import pl.adrian.airbnb.security.AuthenticationFacade;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ReservationServiceImplTest {

    ReservationServiceImpl reservationService;

    @Mock
    ReservationRepository reservationRepository;

    @Mock
    UserRepository userRepository;

    @Mock
    ListingRepository listingRepository;

    @Mock
    AuthenticationFacade authenticationFacade;

    ReservationConverter reservationConverter = new ReservationConverter();

    @Captor
    ArgumentCaptor<Reservation> reservationAc;

    @BeforeEach
    void setUp() {
        reservationService = new ReservationServiceImpl(reservationRepository, userRepository, listingRepository,
                reservationConverter, authenticationFacade);
    }

    @DisplayName("Create reservation - check-in date after checkout date")
    @Test
    void createReservationCheckInDateAfterCheckoutDate() {
        ReservationRequest request = new ReservationRequest("2023-12-11", "2023-12-10", 1, 1);

        assertThrows(ResponseStatusException.class, () -> reservationService.createReservation(request));
    }

    @DisplayName("Create reservation - listing not found")
    @Test
    void createReservationListingNotFound() {
        ReservationRequest request = ReservationDataBuilder.buildReservationRequest();
        User user = UserDataBuilder.buildUser();

        when(authenticationFacade.getUserEmail()).thenReturn("jan@gmail.com");
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        when(listingRepository.findById(anyInt())).thenReturn(Optional.empty());

        assertThrows(ResponseStatusException.class, () -> reservationService.createReservation(request));
    }

    @DisplayName("Create reservation - dates not available")
    @Test
    void createReservationDatesNotAvailable() {
        ReservationRequest request = ReservationDataBuilder.buildReservationRequest();
        User user = UserDataBuilder.buildUser();
        Listing listing = ListingDataBuilder.buildListing();

        when(authenticationFacade.getUserEmail()).thenReturn("jan@gmail.com");
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        when(listingRepository.findById(anyInt())).thenReturn(Optional.of(listing));
        when(reservationRepository.existsByListingAndDates(anyInt(), any(), any())).thenReturn(true);

        assertThrows(ResponseStatusException.class, () -> reservationService.createReservation(request));
    }

    @DisplayName("Create reservation - number of guests exceeds maximum")
    @Test
    void createReservationNumberGuestsExceedsMax() {
        ReservationRequest request = ReservationDataBuilder.buildReservationRequest();
        User user = UserDataBuilder.buildUser();
        Listing listing = ListingDataBuilder.buildListing();
        listing.getListingDetails().setMaxGuests(0);

        when(authenticationFacade.getUserEmail()).thenReturn("jan@gmail.com");
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        when(listingRepository.findById(anyInt())).thenReturn(Optional.of(listing));
        when(reservationRepository.existsByListingAndDates(anyInt(), any(), any())).thenReturn(false);

        assertThrows(ResponseStatusException.class, () -> reservationService.createReservation(request));
    }

    @DisplayName("Create reservation - success")
    @Test
    void createReservationSuccess() {
        Listing listing = ListingDataBuilder.buildListing();
        listing.setPrice(100);
        ReservationRequest request = new ReservationRequest("2023-12-11", "2023-12-13", 2, listing.getId());
        User user = UserDataBuilder.buildUser();

        when(authenticationFacade.getUserEmail()).thenReturn("jan@gmail.com");
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        when(listingRepository.findById(anyInt())).thenReturn(Optional.of(listing));
        when(reservationRepository.existsByListingAndDates(anyInt(), any(), any())).thenReturn(false);

        reservationService.createReservation(request);

        verify(reservationRepository).save(reservationAc.capture());

        Reservation reservation = reservationAc.getValue();
        assertNull(reservation.getId());
        assertNotNull(reservation.getCheckInDate());
        assertNotNull(reservation.getCheckoutDate());
        assertEquals(request.totalGuests(), reservation.getTotalGuests());
        assertNotNull(reservation.getListing());
        assertNotNull(reservation.getMadeByUser());
        assertEquals(200, reservation.getTotalPrice());
    }

    @DisplayName("Get all user's reservations")
    @Test
    void getUserReservations() {
        Reservation reservationDb = ReservationDataBuilder.buildReservation();

        when(authenticationFacade.getUserEmail()).thenReturn("jan@wp.pl");
        when(reservationRepository.findByMadeByUser_Email(anyString())).thenReturn(List.of(reservationDb));

        List<ReservationResponse> response = reservationService.getUserReservations();

        assertEquals(1, response.size());
    }

    @DisplayName("Cancel reservation - not found")
    @Test
    void cancelReservationNotFound() {
        String userEmail = "jan@gmail.com";

        when(authenticationFacade.getUserEmail()).thenReturn(userEmail);
        when(reservationRepository.findByIdAndMadeByUser_Email(1, userEmail)).thenReturn(Optional.empty());

        assertThrows(ResponseStatusException.class, () -> reservationService.cancelReservation(1));
    }

    @DisplayName("Cancel reservation - success")
    @Test
    void cancelReservation() {
        String userEmail = "jan@gmail.com";
        Reservation reservationDb = ReservationDataBuilder.buildReservation();
        Listing listingDb = reservationDb.getListing();
        listingDb.getReservations().add(reservationDb);

        when(authenticationFacade.getUserEmail()).thenReturn(userEmail);
        when(reservationRepository.findByIdAndMadeByUser_Email(1, userEmail)).thenReturn(Optional.of(reservationDb));

        reservationService.cancelReservation(1);

        verify(reservationRepository).delete(reservationAc.capture());

        Reservation reservationBeforeDelete = reservationAc.getValue();

        assertNull(reservationBeforeDelete.getListing());
        assertEquals(0, listingDb.getReservations().size());
    }
}