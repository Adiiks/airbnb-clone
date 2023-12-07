package pl.adrian.airbnb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.adrian.airbnb.entity.Listing;

import java.util.List;

public interface ListingRepository extends JpaRepository<Listing, Integer> {

    List<Listing> findByCategory_Id(Integer id);
}