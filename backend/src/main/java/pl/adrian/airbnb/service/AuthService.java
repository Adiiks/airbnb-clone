package pl.adrian.airbnb.service;

import pl.adrian.airbnb.dto.SignupRequest;
import pl.adrian.airbnb.exception.EmailNotAvailableException;

public interface AuthService {

    void registerUser(SignupRequest request) throws EmailNotAvailableException;
}
