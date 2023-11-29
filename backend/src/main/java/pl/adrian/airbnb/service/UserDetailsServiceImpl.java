package pl.adrian.airbnb.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.adrian.airbnb.entity.User;
import pl.adrian.airbnb.repository.UserRepository;
import pl.adrian.airbnb.security.UserDetailsImpl;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User with email: " + email + " not found"));

        return buildUserDetails(user);
    }

    private UserDetailsImpl buildUserDetails(User user) {
        return UserDetailsImpl.builder()
                .id(user.getId())
                .password(user.getPassword())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .build();
    }
}
