package pl.adrian.airbnb.dto;

public record LoginResponse(
        String token,
        Integer id,
        String email,
        String fullName
) {
}
