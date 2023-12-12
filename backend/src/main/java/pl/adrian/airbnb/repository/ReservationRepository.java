package pl.adrian.airbnb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.adrian.airbnb.entity.Reservation;

import java.time.LocalDate;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    @Query("""
            select (count(r) > 0) from Reservation r
            where r.listing.id = ?1 and (r.checkInDate between ?2 and ?3 or r.checkoutDate between ?2 and ?3)""")
    boolean existsByListingAndDates(Integer id, LocalDate dateStart, LocalDate dateEnd);
}