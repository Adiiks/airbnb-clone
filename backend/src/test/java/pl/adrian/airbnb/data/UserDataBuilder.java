package pl.adrian.airbnb.data;

import pl.adrian.airbnb.entity.User;

import java.util.LinkedHashSet;

public class UserDataBuilder {

    public static User buildUser() {
        return User.builder()
                .id(1)
                .fullName("Jan Kowalski")
                .email("jan@gmail.com")
                .password("dasdasdasdsadsad")
                .wishlist(new LinkedHashSet<>())
                .build();
    }
}
