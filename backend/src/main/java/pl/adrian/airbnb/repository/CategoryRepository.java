package pl.adrian.airbnb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.adrian.airbnb.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}