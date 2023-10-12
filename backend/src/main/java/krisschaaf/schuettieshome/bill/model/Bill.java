package krisschaaf.schuettieshome.bill.model;

import krisschaaf.schuettieshome.car.model.Car;
import krisschaaf.schuettieshome.customer.Customer;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@Document
public class Bill {

    @Id
    private String id;

    @DBRef
    private Customer customer;

    private List<BilledCar> billedCars;

    private String paymentAmount;

    @Data
    public static class BilledCar {
        @DBRef
        private Car car;

        private Date endDate;
    }
}
