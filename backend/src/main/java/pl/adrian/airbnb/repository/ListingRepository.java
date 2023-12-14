package pl.adrian.airbnb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import pl.adrian.airbnb.entity.Listing;

import java.util.List;

public interface ListingRepository extends JpaRepository<Listing, Integer>, JpaSpecificationExecutor<Listing> {

    List<Listing> findByCategory_Id(Integer id);

    List<Listing> findByUsersWhoAddedToWishlist_Email(String email);
}