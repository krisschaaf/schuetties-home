package krisschaaf.schuettieshome.bill.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class BillPDFNoDataDTO {
    private String id;
    private String name;
    private Date creationDate;
    private String customerFirstName;
    private String customerLastName;
}
