package krisschaaf.schuettieshome.car.repository;

import krisschaaf.schuettieshome.car.model.Car;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CarRepository extends MongoRepository<Car, String> {
}
