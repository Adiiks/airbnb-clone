package pl.adrian.airbnb.service;

import pl.adrian.airbnb.dto.LoginRequest;
import pl.adrian.airbnb.dto.LoginResponse;
import pl.adrian.airbnb.dto.SignupRequest;
import pl.adrian.airbnb.exception.EmailNotAvailableException;

public interface AuthService {

    void registerUser(SignupRequest request) throws EmailNotAvailableException;

    LoginResponse authenticateUser(LoginRequest request);
}
