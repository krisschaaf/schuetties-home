package krisschaaf.schuettieshome.car.controller;

import krisschaaf.schuettieshome.api.Api;
import krisschaaf.schuettieshome.car.model.Car;
import krisschaaf.schuettieshome.car.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(Api.CAR_PATH)
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

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Car getCarById(@PathVariable String id) {
        return this.carService.getCarById(id);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<Car> getAllCars() {
        return this.carService.getAllCars();
    }

    @GetMapping("/ofCustomer/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<Car> findCarsByCustomerId(@PathVariable String id) {
        return this.carService.findCarsByCustomerId(id);
    };

    @PutMapping()
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void editCustomer(@RequestBody Car car) {
        this.carService.editCar(car);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteCarByID(@PathVariable String id) {
        this.carService.deleteCarById(id);
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deleteAllCars() {
        this.carService.deleteAllCars();
    }
}
