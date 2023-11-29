package pl.adrian.airbnb.data;

import pl.adrian.airbnb.dto.SignupRequest;

public class AuthDataBuilder {

    public static SignupRequest buildSignupRequestInvalid() {
        return new SignupRequest("asdasdasdsa", "", "");
    }

    public static SignupRequest buildSignupRequest() {
        return new SignupRequest("adrian@gmail.com", "root", "Jan Kowalski");
    }
}
