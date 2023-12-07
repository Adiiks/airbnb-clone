package pl.adrian.airbnb.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "listing_details")
public class ListingDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "max_guests", nullable = false)
    private Integer maxGuests;

    @Column(name = "total_bedrooms", nullable = false)
    private Integer totalBedrooms;

    @Column(name = "total_beds", nullable = false)
    private Integer totalBeds;

    @Column(name = "total_bathrooms", nullable = false)
    private Integer totalBathrooms;
}