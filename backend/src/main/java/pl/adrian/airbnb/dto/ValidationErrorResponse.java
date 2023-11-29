package pl.adrian.airbnb.dto;

import java.util.List;

public record ValidationErrorResponse(
        List<ValidationError> errors
) {
}
