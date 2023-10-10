package krisschaaf.schuettieshome.car.service;

import krisschaaf.schuettieshome.car.model.Car;
import krisschaaf.schuettieshome.car.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public Car getCarById(String id) {
        return this.carRepository.findById(id).orElseThrow(() -> new RuntimeException("Could not find car"));
    }

    public List<Car> getAllCars() {
        return this.carRepository.findAll();
    }

    public void deleteAllCars() {
        this.carRepository.deleteAll();
    }

    public void editCar(Car car) {
        this.carRepository.save(car);
    }

    public void deleteCarById(String id) {
        this.carRepository.deleteById(id);
    }

    public List<Car> findCarsByCustomerId(String id) {
        return this.carRepository.getCarsByCustomer_Id(id);
    }
}
