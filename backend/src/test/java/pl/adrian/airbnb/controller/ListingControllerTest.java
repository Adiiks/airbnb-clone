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
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import pl.adrian.airbnb.data.ListingDataBuilder;
import pl.adrian.airbnb.dto.ListingFilterDTO;
import pl.adrian.airbnb.dto.ListingRequest;
import pl.adrian.airbnb.service.ListingService;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class ListingControllerTest {

    MockMvc mockMvc;

    @InjectMocks
    ListingController listingController;

    @Mock
    ListingService listingService;

    ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(listingController)
                .setControllerAdvice(new ErrorHandlingControllerAdvice())
                .build();
    }

    @DisplayName("Create new listing")
    @Test
    void createListing() throws Exception {
        ListingRequest request = ListingDataBuilder.buildListingRequest();
        MockMultipartFile file = new MockMultipartFile("file", "This is content".getBytes());
        MockMultipartFile requestJson = new MockMultipartFile("listing", "", "application/json",
                objectMapper.writeValueAsString(request).getBytes());

        mockMvc.perform(multipart("/api/listings")
                        .file(file)
                        .file(requestJson))
                .andExpect(status().isCreated());

        verify(listingService).createListing(any(), any());
    }

    @DisplayName("Create new listing - validation failed")
    @Test
    void createListingBodyInvalid() throws Exception {
        ListingRequest request = ListingDataBuilder.buildListingRequestInvalid();
        MockMultipartFile file = new MockMultipartFile("file", "This is content".getBytes());
        MockMultipartFile requestJson = new MockMultipartFile("listing", "", "application/json",
                objectMapper.writeValueAsString(request).getBytes());

        mockMvc.perform(multipart("/api/listings")
                        .file(file)
                        .file(requestJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors", hasSize(12)));

        verify(listingService, times(0)).createListing(any(), any());
    }

    @DisplayName("Get list of listing by category id without filters")
    @Test
    void getListingByCategoryWithoutFilters() throws Exception {
        mockMvc.perform(get("/api/listings/category/1"))
                .andExpect(status().isOk());

        verify(listingService).getListingsByCategory(anyInt(), any());
    }

    @DisplayName("Get list of listing by category id with filters - wrong dates format")
    @Test
    void getListingByCategoryWithInvalidFilter() throws Exception {
        ListingFilterDTO filter = new ListingFilterDTO(null, "13-12-2023", "12312", null);

        mockMvc.perform(get("/api/listings/category/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(filter)))
                .andExpect(status().isBadRequest());
    }

    @DisplayName("Get list of listing by category id with filters")
    @Test
    void getListingByCategoryWithFilters() throws Exception {
        ListingFilterDTO filter = new ListingFilterDTO(null, "2023-12-13", "2023-12-14", null);

        mockMvc.perform(get("/api/listings/category/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(filter)))
                .andExpect(status().isOk());

        verify(listingService).getListingsByCategory(anyInt(), any());
    }

    @DisplayName("Add listing to wishlist")
    @Test
    void addListingToWishlist() throws Exception {
        mockMvc.perform(put("/api/listings/wishlist/add/1"))
                .andExpect(status().isNoContent());
    }

    @DisplayName("Remove listing from wishlist")
    @Test
    void removeListingFromWishlist() throws Exception {
        mockMvc.perform(put("/api/listings/wishlist/remove/1"))
                .andExpect(status().isNoContent());
    }

    @DisplayName("Get listing by id")
    @Test
    void getListingById() throws Exception {
        mockMvc.perform(get("/api/listings/1"))
                .andExpect(status().isOk());

        verify(listingService).getListingById(anyInt());
    }

    @DisplayName("Get list of listings on user wishlist")
    @Test
    void getListingsOnWishlist() throws Exception {
        mockMvc.perform(get("/api/listings/wishlist"))
                .andExpect(status().isOk());

        verify(listingService).getListingsOnWishlist();
    }
}