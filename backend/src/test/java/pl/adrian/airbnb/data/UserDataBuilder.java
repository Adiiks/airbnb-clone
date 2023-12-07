package pl.adrian.airbnb.data;

import pl.adrian.airbnb.entity.User;

public class UserDataBuilder {

    public static User buildUser() {
        return User.builder()
                .id(1)
                .fullName("Jan Kowalski")
                .email("jan@gmail.com")
                .password("dasdasdasdsadsad")
                .build();
    }
}
