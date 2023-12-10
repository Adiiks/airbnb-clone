package pl.adrian.airbnb.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.adrian.airbnb.dto.ListingRequest;
import pl.adrian.airbnb.dto.ListingResponse;
import pl.adrian.airbnb.service.ListingService;

import java.util.List;

@RestController
@RequestMapping("/api/listings")
@RequiredArgsConstructor
public class ListingController {

    private final ListingService listingService;

    @PreAuthorize("isAuthenticated()")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createListing(@RequestPart MultipartFile file, @Valid @RequestPart ListingRequest listing) {
        listingService.createListing(file, listing);
    }

    @PreAuthorize("permitAll()")
    @GetMapping("/category/{categoryId}")
    public List<ListingResponse> getListingsByCategory(@PathVariable Integer categoryId) {
        return listingService.getListingsByCategory(categoryId);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/wishlist/add/{listingId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void addListingToWishlist(@PathVariable Integer listingId) {
        listingService.addListingToWishlist(listingId);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/wishlist/remove/{listingId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeListingFromWishlist(@PathVariable Integer listingId) {
        listingService.removeListingFromWishlist(listingId);
    }
}
