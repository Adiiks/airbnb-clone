package pl.adrian.airbnb.service;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.adrian.airbnb.data.CategoryDataBuilder;
import pl.adrian.airbnb.dto.CategoryResponse;
import pl.adrian.airbnb.entity.Category;
import pl.adrian.airbnb.repository.CategoryRepository;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CategoryServiceImplTest {

    @InjectMocks
    CategoryServiceImpl categoryService;

    @Mock
    CategoryRepository categoryRepository;

    @DisplayName("Get list of all categories")
    @Test
    void getCategories() {
        Category category = CategoryDataBuilder.buildCategory();
        List<Category> categories = List.of(category);

        when(categoryRepository.findAll())
                .thenReturn(categories);

        List<CategoryResponse> categoryResponses = categoryService.getCategories();

        assertEquals(categories.size(), categoryResponses.size());
    }
}