package pl.adrian.airbnb.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.adrian.airbnb.dto.LoginRequest;
import pl.adrian.airbnb.dto.LoginResponse;
import pl.adrian.airbnb.dto.SignupRequest;
import pl.adrian.airbnb.exception.EmailNotAvailableException;
import pl.adrian.airbnb.service.AuthService;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PreAuthorize("permitAll()")
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void registerUser(@Valid @RequestBody SignupRequest request) {
        authService.registerUser(request);
    }

    @PreAuthorize("permitAll()")
    @PostMapping("/login")
    public LoginResponse authenticateUser(@Valid @RequestBody LoginRequest request) {
        return authService.authenticateUser(request);
    }

    @ExceptionHandler(EmailNotAvailableException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Boolean> handleEmailNotAvailable(EmailNotAvailableException ex) {
        return Collections.singletonMap("emailNotAvailable", true);
    }
}
