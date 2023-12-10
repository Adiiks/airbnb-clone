package pl.adrian.airbnb.service;

import org.springframework.web.multipart.MultipartFile;
import pl.adrian.airbnb.dto.ListingRequest;
import pl.adrian.airbnb.dto.ListingResponse;

import java.util.List;

public interface ListingService {

    void createListing(MultipartFile image, ListingRequest listing);

    List<ListingResponse> getListingsByCategory(Integer categoryId);

    void addListingToWishlist(Integer listingId);

    void removeListingFromWishlist(Integer listingId);
}
