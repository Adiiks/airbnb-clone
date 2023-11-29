package pl.adrian.airbnb.service;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import pl.adrian.airbnb.data.AuthDataBuilder;
import pl.adrian.airbnb.dto.SignupRequest;
import pl.adrian.airbnb.entity.User;
import pl.adrian.airbnb.exception.EmailNotAvailableException;
import pl.adrian.airbnb.repository.UserRepository;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceImplTest {

    @InjectMocks
    AuthServiceImpl authService;

    @Mock
    PasswordEncoder passwordEncoder;

    @Mock
    UserRepository userRepository;

    @Captor
    ArgumentCaptor<User> userAc;

    @DisplayName("register user - email not available")
    @Test
    void registerUserEmailNotAvailable() {
        SignupRequest request = AuthDataBuilder.buildSignupRequest();

        when(userRepository.existsByEmail(anyString()))
                .thenReturn(true);

        assertThrows(EmailNotAvailableException.class,
                () -> authService.registerUser(request));
    }

    @DisplayName("register user - success")
    @Test
    void registerUser() {
        SignupRequest request = AuthDataBuilder.buildSignupRequest();

        when(userRepository.existsByEmail(anyString()))
                .thenReturn(false);
        when(passwordEncoder.encode(anyString()))
                .thenReturn("kasdlaskdasldksad");

        authService.registerUser(request);

        verify(userRepository).save(userAc.capture());

        User userBeforeSaved = userAc.getValue();

        assertNull(userBeforeSaved.getId());
        assertEquals(request.email(), userBeforeSaved.getEmail());
        assertEquals(request.fullName(), userBeforeSaved.getFullName());
        assertNotEquals(request.password(), userBeforeSaved.getPassword());
    }
}