package pl.adrian.airbnb.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.adrian.airbnb.dto.LoginRequest;
import pl.adrian.airbnb.dto.LoginResponse;
import pl.adrian.airbnb.dto.SignupRequest;
import pl.adrian.airbnb.entity.User;
import pl.adrian.airbnb.exception.EmailNotAvailableException;
import pl.adrian.airbnb.repository.UserRepository;
import pl.adrian.airbnb.security.JwtUtils;
import pl.adrian.airbnb.security.UserDetailsImpl;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

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

    @Override
    public LoginResponse authenticateUser(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return new LoginResponse(
                token,
                userDetails.getId(),
                userDetails.getEmail(),
                userDetails.getFullName());
    }
}
