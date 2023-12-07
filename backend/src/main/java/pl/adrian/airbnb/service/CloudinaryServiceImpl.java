package pl.adrian.airbnb.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class CloudinaryServiceImpl implements CloudinaryService {

    private final Cloudinary cloudinary;

    @Override
    public String uploadImage(MultipartFile image) {
        Map<String, Object> response;

        try {
            response =  cloudinary.uploader().upload(image.getBytes(), ObjectUtils.emptyMap());
        } catch (IOException e) {
            log.error("Error with uploading image", e);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Error occur with uploading image");
        }

        return (String) response.get("url");
    }
}
