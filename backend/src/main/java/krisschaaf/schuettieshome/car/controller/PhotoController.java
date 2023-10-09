package krisschaaf.schuettieshome.car.controller;

import krisschaaf.schuettieshome.car.model.Photo;
import krisschaaf.schuettieshome.car.service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/car/photos")
@CrossOrigin("http://localhost:4200/")
public class PhotoController {

    private PhotoService photoService;

    @Autowired
    public PhotoController(PhotoService photoService) {
        this.photoService = photoService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Photo addPhoto(@RequestParam("photoFile") MultipartFile photoFile) throws IOException {
        return photoService.addPhoto(photoFile);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Photo getPhoto(@PathVariable String id) {
        return photoService.getPhoto(id);
    }
}
