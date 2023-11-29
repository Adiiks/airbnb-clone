package pl.adrian.airbnb.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.adrian.airbnb.dto.SignupRequest;
import pl.adrian.airbnb.entity.User;
import pl.adrian.airbnb.exception.EmailNotAvailableException;
import pl.adrian.airbnb.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Transactional
    @Override
    public void registerUser(SignupRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new EmailNotAvailableException("Email already in use");
        }

        User user = User.builder()
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .fullName(request.fullName())
                .build();

        userRepository.save(user);
    }
}
