package pl.adrian.airbnb.dto;

public record ValidationError(
        String fieldName,
        String errorMessage
) {
}
