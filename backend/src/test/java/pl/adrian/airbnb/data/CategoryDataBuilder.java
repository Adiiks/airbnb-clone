package pl.adrian.airbnb.data;

import pl.adrian.airbnb.entity.Category;

public class CategoryDataBuilder {

    public static Category buildCategory() {
        return Category.builder()
                .id(1)
                .name("Tropical")
                .iconName("/categories-icons/tropical.png")
                .build();
    }
}
