package pl.adrian.airbnb.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import pl.adrian.airbnb.data.CategoryDataBuilder;
import pl.adrian.airbnb.data.ListingDataBuilder;
import pl.adrian.airbnb.data.UserDataBuilder;
import pl.adrian.airbnb.dto.AddressRequest;
import pl.adrian.airbnb.dto.ListingDetailsRequest;
import pl.adrian.airbnb.dto.ListingRequest;
import pl.adrian.airbnb.entity.*;
import pl.adrian.airbnb.repository.CategoryRepository;
import pl.adrian.airbnb.repository.ListingRepository;
import pl.adrian.airbnb.repository.UserRepository;
import pl.adrian.airbnb.security.AuthenticationFacade;
import pl.adrian.airbnb.utils.ImageValidation;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ListingServiceImplTest {

    ListingServiceImpl listingService;

    @Mock
    ListingRepository listingRepository;

    @Mock
    UserRepository userRepository;

    @Mock
    CategoryRepository categoryRepository;

    @Mock
    CloudinaryService cloudinaryService;

    @Mock
    AuthenticationFacade authenticationFacade;

    ImageValidation imageValidation = new ImageValidation();

    @Captor
    ArgumentCaptor<Listing> listingAc;

    @BeforeEach
    void setUp() {
        listingService = new ListingServiceImpl(
                listingRepository,
                userRepository,
                categoryRepository,
                cloudinaryService,
                authenticationFacade,
                imageValidation
        );
    }

    @DisplayName("Create new listing - invalid image type")
    @Test
    void createListingInvalidImageType() {
        ListingRequest listing = ListingDataBuilder.buildListingRequest();
        MockMultipartFile image = new MockMultipartFile("image", "image.exe", "", "image content".getBytes());

        assertThrows(ResponseStatusException.class,
                () -> listingService.createListing(image, listing));
    }

    @DisplayName("Create new listing - user not found")
    @Test
    void createListingUserNotFound() {
        ListingRequest listing = ListingDataBuilder.buildListingRequest();
        MockMultipartFile image = new MockMultipartFile("image", "image.png", "", "image content".getBytes());

        when(authenticationFacade.getUserEmail())
                .thenReturn("jan@gmail.com");

        when(userRepository.findByEmail(anyString()))
                .thenReturn(Optional.empty());

        assertThrows(ResponseStatusException.class,
                () -> listingService.createListing(image, listing));
    }

    @DisplayName("Create new listing - category not found")
    @Test
    void createListingCategoryNotFound() {
        ListingRequest listing = ListingDataBuilder.buildListingRequest();
        MockMultipartFile image = new MockMultipartFile("image", "image.png", "", "image content".getBytes());
        User owner = UserDataBuilder.buildUser();

        when(authenticationFacade.getUserEmail())
                .thenReturn(owner.getEmail());

        when(userRepository.findByEmail(anyString()))
                .thenReturn(Optional.of(owner));

        when(categoryRepository.findById(anyInt()))
                .thenReturn(Optional.empty());

        assertThrows(ResponseStatusException.class,
                () -> listingService.createListing(image, listing));
    }

    @DisplayName("Create new listing - success")
    @Test
    void createListing() {
        ListingRequest listing = ListingDataBuilder.buildListingRequest();
        MockMultipartFile image = new MockMultipartFile("image", "image.png", "", "image content".getBytes());
        User owner = UserDataBuilder.buildUser();
        Category category = CategoryDataBuilder.buildCategory();
        String imageUrl = "https://cloudinary/image";

        when(authenticationFacade.getUserEmail())
                .thenReturn(owner.getEmail());

        when(userRepository.findByEmail(anyString()))
                .thenReturn(Optional.of(owner));

        when(categoryRepository.findById(anyInt()))
                .thenReturn(Optional.of(category));

        when(cloudinaryService.uploadImage(any()))
                .thenReturn(imageUrl);

        listingService.createListing(image, listing);

        verify(listingRepository).save(listingAc.capture());

        Listing listingBeforeSave = listingAc.getValue();

        // assert Listing
        assertNull(listingBeforeSave.getId());
        assertNotNull(listingBeforeSave.getCategory());
        assertNotNull(listingBeforeSave.getAddress());
        assertNotNull(listingBeforeSave.getListingDetails());
        assertEquals(imageUrl, listingBeforeSave.getImageUrl());
        assertEquals(listing.title(), listingBeforeSave.getTitle());
        assertEquals(listing.description(), listingBeforeSave.getDescription());
        assertEquals(listing.price(), listingBeforeSave.getPrice());
        assertNotNull(listingBeforeSave.getOwner());

        // assert Address
        Address address = listingBeforeSave.getAddress();
        AddressRequest addressRequest = listing.address();
        assertNull(address.getId());
        assertEquals(addressRequest.country(), address.getCountry());
        assertEquals(addressRequest.streetAddress(), address.getStreetAddress());
        assertEquals(addressRequest.postalCode(), address.getPostalCode());
        assertEquals(addressRequest.city(), address.getCity());

        // assert Listing Details
        ListingDetails listingDetails = listingBeforeSave.getListingDetails();
        ListingDetailsRequest listingDetailsRequest = listing.listingDetails();
        assertNull(listingDetails.getId());
        assertEquals(listingDetailsRequest.maxGuests(), listingDetails.getMaxGuests());
        assertEquals(listingDetailsRequest.totalBedrooms(), listingDetails.getTotalBedrooms());
        assertEquals(listingDetailsRequest.totalBeds(), listingDetails.getTotalBeds());
        assertEquals(listingDetailsRequest.totalBathrooms(), listingDetails.getTotalBathrooms());
    }
}