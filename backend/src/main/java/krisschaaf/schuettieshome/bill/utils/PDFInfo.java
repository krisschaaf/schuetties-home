package krisschaaf.schuettieshome.bill.utils;

import krisschaaf.schuettieshome.bill.model.Bill;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PDFInfo {
    private String author;
    private String creator;
    private String Subject;
    private String title;

    public static PDFInfo getDefaultPDFInfo(Bill bill) {
        return new PDFInfo(
                "Karen Schuett",
                "schuetties-home",
                "Rechnung Stellplatz Autohalle Bredstedt",
                "Rechnung mit ID: '" + bill.getId() + "'. Kunde: '" + bill.getCustomer().getLastname() + ", " + bill.getCustomer().getFirstname() + "'."
        );
    }
}

