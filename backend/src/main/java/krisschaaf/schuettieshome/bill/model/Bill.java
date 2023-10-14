package krisschaaf.schuettieshome.bill.model;

import krisschaaf.schuettieshome.customer.Customer;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document
public class Bill {

    @Id
    private String id;

    @DBRef
    private Customer customer;

    private List<BilledCar> billedCars;

    private String pricePerMonth;

    public long getPricePerMonthAsLong() {
        String pricePerMonthAsString = this.getPricePerMonth();
        String integerPart = pricePerMonthAsString.split("\\.")[0];
        String decimalPart = pricePerMonthAsString.split("\\.")[1];

        return Long.parseLong(integerPart) + (Long.parseLong(decimalPart) / 100);
    }
}
