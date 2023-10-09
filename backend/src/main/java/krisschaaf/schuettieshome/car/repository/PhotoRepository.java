package krisschaaf.schuettieshome.car.repository;

import krisschaaf.schuettieshome.car.model.Photo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PhotoRepository extends MongoRepository<Photo, String>  { }
