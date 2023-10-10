package krisschaaf.schuettieshome.car.repository;

import krisschaaf.schuettieshome.car.model.Car;
import krisschaaf.schuettieshome.customer.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CarRepository extends MongoRepository<Car, String> {

    public List<Car> findCarsByCustomer(Customer customer);

    public List<Car> getCarsByCustomer_Id(String customer_id);
}
