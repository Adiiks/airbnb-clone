package pl.adrian.airbnb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.adrian.airbnb.entity.Reservation;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    @Query("""
            select (count(r) > 0) from Reservation r
            where r.listing.id = ?1 and (r.checkInDate between ?2 and ?3 or r.checkoutDate between ?2 and ?3)""")
    boolean existsByListingAndDates(Integer id, LocalDate dateStart, LocalDate dateEnd);

    List<Reservation> findByMadeByUser_Email(String email);

    Optional<Reservation> findByIdAndMadeByUser_Email(Integer id, String email);
}