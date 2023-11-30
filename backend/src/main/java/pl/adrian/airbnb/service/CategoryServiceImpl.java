package pl.adrian.airbnb.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.adrian.airbnb.dto.CategoryResponse;
import pl.adrian.airbnb.entity.Category;
import pl.adrian.airbnb.repository.CategoryRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public List<CategoryResponse> getCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(this::convertToCategoryResponse)
                .toList();
    }

    private CategoryResponse convertToCategoryResponse(Category category) {
        return new CategoryResponse(
                category.getId(),
                category.getName(),
                category.getIconName());
    }
}
