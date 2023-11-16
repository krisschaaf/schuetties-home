package krisschaaf.schuettieshome.bill.model;

import krisschaaf.schuettieshome.customer.Customer;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
public class BillPDFDTO {
    private MultipartFile file;
    private Customer customer;
}
