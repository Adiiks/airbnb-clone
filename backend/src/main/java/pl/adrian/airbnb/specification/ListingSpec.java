package pl.adrian.airbnb.specification;

import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;
import pl.adrian.airbnb.dto.ListingFilterDTO;
import pl.adrian.airbnb.entity.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
public class ListingSpec implements Specification<Listing> {

    private final ListingFilterDTO filters;
    private final Integer categoryId;

    @Override
    public Predicate toPredicate(Root<Listing> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
        List<Predicate> predicates = new ArrayList<>();

        query.distinct(true);

        Join<Category, Listing> category = root.join("category");

        Predicate categoryPredicate = cb.equal(cb.literal(categoryId), category.get("id"));
        predicates.add(categoryPredicate);

        if (StringUtils.hasText(filters.country())) {
            Join<Address, Listing> address = root.join("address");
            Predicate countryPredicate = cb.equal(address.get("country"), filters.country());
            predicates.add(countryPredicate);
        }

        if (StringUtils.hasText(filters.checkInDate()) && StringUtils.hasText(filters.checkoutDate())) {
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate checkIn = LocalDate.parse(filters.checkInDate(), dateFormatter);
            LocalDate checkout = LocalDate.parse(filters.checkoutDate(), dateFormatter);

            Join<Reservation, Listing> reservation = root.join("reservations", JoinType.LEFT);
            Predicate datesPredicate = cb.or(
                    cb.and(
                            cb.not(
                                    cb.between(cb.literal(checkIn),
                                            reservation.get("checkInDate"),
                                            reservation.get("checkoutDate"))
                            ),
                            cb.not(
                                    cb.between(cb.literal(checkout),
                                            reservation.get("checkInDate"),
                                            reservation.get("checkoutDate"))
                            )
                    ),
                    reservation.isNull()
            );
            predicates.add(datesPredicate);
        }

        if (filters.totalGuests() != null && filters.totalGuests() > 1) {
            Join<ListingDetails, Listing> listingDetails = root.join("listingDetails");
            Predicate guestsPredicate = cb.lessThanOrEqualTo(
                    cb.literal(filters.totalGuests()),
                    listingDetails.get("maxGuests")
            );
            predicates.add(guestsPredicate);
        }

        return cb.and(predicates.toArray(new Predicate[predicates.size()]));
    }
}
