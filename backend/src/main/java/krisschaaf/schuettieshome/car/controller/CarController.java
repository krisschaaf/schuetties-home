package krisschaaf.schuettieshome.car.controller;

import krisschaaf.schuettieshome.car.model.Car;
import krisschaaf.schuettieshome.car.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cars/car")
@CrossOrigin("http://localhost:4200/")
public class CarController {
    private CarService carService;

    @Autowired
    public CarController(CarService carService) {
        this.carService = carService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void addCar(@RequestBody Car car) {
        carService.addCar(car);
    }
}
