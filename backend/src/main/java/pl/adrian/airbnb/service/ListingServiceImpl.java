package pl.adrian.airbnb.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import pl.adrian.airbnb.converter.ListingConverter;
import pl.adrian.airbnb.dto.ListingRequest;
import pl.adrian.airbnb.dto.ListingResponse;
import pl.adrian.airbnb.entity.*;
import pl.adrian.airbnb.repository.CategoryRepository;
import pl.adrian.airbnb.repository.ListingRepository;
import pl.adrian.airbnb.repository.UserRepository;
import pl.adrian.airbnb.security.AuthenticationFacade;
import pl.adrian.airbnb.utils.ImageValidation;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ListingServiceImpl implements ListingService {

    private final ListingRepository listingRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final CloudinaryService cloudinaryService;
    private final AuthenticationFacade authFacade;
    private final ImageValidation imageValidation;
    private final ListingConverter listingConverter;

    @Transactional
    @Override
    public void createListing(MultipartFile image, ListingRequest listing) {
        if (!imageValidation.isImageValid(image)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Type of image is invalid");
        }

        User owner = findUser(authFacade.getUserEmail());

        Category listingCategory = findCategory(listing.categoryId());

        String imageUrl = cloudinaryService.uploadImage(image);

        Listing newListing = listingConverter.convertListingRequestToListing(listing);
        newListing.setImageUrl(imageUrl);
        newListing.setCategory(listingCategory);
        newListing.setOwner(owner);

        listingRepository.save(newListing);
    }

    @Override
    public List<ListingResponse> getListingsByCategory(Integer categoryId) {
        return listingRepository.findByCategory_Id(categoryId)
                .stream()
                .map(listingConverter::convertListingToListingResponse)
                .toList();
    }

    private User findUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "User with email: " + email + " not found"));
    }

    private Category findCategory(Integer categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Category with id: " + categoryId + " not found"));
    }
}
