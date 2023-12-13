package pl.adrian.airbnb.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import pl.adrian.airbnb.data.ReservationDataBuilder;
import pl.adrian.airbnb.dto.ReservationRequest;
import pl.adrian.airbnb.service.ReservationService;

import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class ReservationControllerTest {

    MockMvc mockMvc;

    @InjectMocks
    ReservationController reservationController;

    @Mock
    ReservationService reservationService;

    ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(reservationController)
                .setControllerAdvice(new ErrorHandlingControllerAdvice())
                .build();
    }

    @DisplayName("Create reservation - invalid body")
    @Test
    void createReservationInvalidBody() throws Exception {
        ReservationRequest request = ReservationDataBuilder.buildInvalidReservationRequest();

        mockMvc.perform(post("/api/reservations")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors", hasSize(4)));
    }

    @DisplayName("Create reservation - success")
    @Test
    void createReservation() throws Exception {
        ReservationRequest request = ReservationDataBuilder.buildReservationRequest();

        mockMvc.perform(post("/api/reservations")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());

        verify(reservationService).createReservation(any());
    }

    @DisplayName("Get all user's reservations")
    @Test
    void getUserReservations() throws Exception {
        mockMvc.perform(get("/api/reservations"))
                .andExpect(status().isOk());

        verify(reservationService).getUserReservations();
    }

    @DisplayName("Cancel reservation based on id")
    @Test
    void cancelReservation() throws Exception {
        mockMvc.perform(delete("/api/reservations/1"))
                .andExpect(status().isNoContent());

        verify(reservationService).cancelReservation(anyInt());
    }
}