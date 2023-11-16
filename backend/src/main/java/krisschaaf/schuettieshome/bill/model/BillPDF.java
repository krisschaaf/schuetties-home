package krisschaaf.schuettieshome.bill.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@NoArgsConstructor
public class BillPDF {

    @Id
    private String id;
    private String name;
    private byte[] data;

    public BillPDF(String name, byte[] data) {
        this.name = name;
        this.data = data;
    }
}
