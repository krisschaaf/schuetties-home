package krisschaaf.schuettieshome.car.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
@Data
public class Car {
    @Id
    String id;

    String customerId; //TODO
    String make;
    String model;
    String year;
    String license;
    Date date;
    String photoId; //TODO

}
