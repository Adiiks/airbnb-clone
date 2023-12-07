package pl.adrian.airbnb.service;

import org.springframework.web.multipart.MultipartFile;
import pl.adrian.airbnb.dto.ListingRequest;

public interface ListingService {

    void createListing(MultipartFile image, ListingRequest listing);
}
