package krisschaaf.schuettieshome.car.model;

import krisschaaf.schuettieshome.customer.Customer;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
@Data
public class Car {
    @Id
    String id;

    String make;
    String model;
    String year;
    String license;
    Date date;

    @DBRef
    Customer customer;
    @DBRef
    Photo photo;

}
