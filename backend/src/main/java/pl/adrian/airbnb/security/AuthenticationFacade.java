package pl.adrian.airbnb.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationFacade {

    public String getUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return (authentication != null) ? authentication.getName() : null;
    }
}
