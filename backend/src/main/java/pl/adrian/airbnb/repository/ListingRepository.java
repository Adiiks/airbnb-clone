package pl.adrian.airbnb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.adrian.airbnb.entity.Listing;

public interface ListingRepository extends JpaRepository<Listing, Integer> {
}