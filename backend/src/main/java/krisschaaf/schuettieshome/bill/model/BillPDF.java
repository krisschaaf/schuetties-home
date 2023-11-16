package krisschaaf.schuettieshome.bill.model;

import krisschaaf.schuettieshome.customer.Customer;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.Date;

@Data
@NoArgsConstructor
public class BillPDF {

    @Id
    private String id;
    private String name;
    private Date creationDate;
    private byte[] data;
    @DBRef
    private Customer customer;

    public BillPDF(String name, Date creationDate, byte[] data, Customer customer) {
        this.name = name;
        this.creationDate = creationDate;
        this.data = data;
        this.customer = customer;
    }
}

