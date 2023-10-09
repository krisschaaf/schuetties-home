package krisschaaf.schuettieshome.car.service;

import krisschaaf.schuettieshome.car.model.Car;
import krisschaaf.schuettieshome.car.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CarService {
    private CarRepository carRepository;

    @Autowired
    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    public void addCar(Car car) {
        this.carRepository.save(car);
    }
}
