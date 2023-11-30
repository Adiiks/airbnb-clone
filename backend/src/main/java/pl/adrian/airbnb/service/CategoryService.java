package pl.adrian.airbnb.service;

import pl.adrian.airbnb.dto.CategoryResponse;

import java.util.List;

public interface CategoryService {

    List<CategoryResponse> getCategories();
}
