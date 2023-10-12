package krisschaaf.schuettieshome.bill.service;

import com.itextpdf.text.DocumentException;
import krisschaaf.schuettieshome.bill.repository.BillRepository;
import krisschaaf.schuettieshome.bill.model.Bill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class BillService {
    private BillRepository billRepository;
    private PDFService pdfService;

    @Autowired
    public BillService(BillRepository billRepository, PDFService pdfService) {
        this.billRepository = billRepository;
        this.pdfService = pdfService;
    }

    public Bill createBill(Bill bill) {
        return this.billRepository.save(bill);
    }

    public Bill getBillById(String id) {
        return this.billRepository.findById(id).orElseThrow(() -> new RuntimeException("Bill could not be found. Search for Tom instead"));
    }

    public List<Bill> getAllCBills() {
        return this.billRepository.findAll();
    }

    public void editBill(Bill bill) {
        this.billRepository.save(bill);
    }

    public void deleteBillById(String id) {
        this.billRepository.deleteById(id);
    }

    public void deleteAll() {
        this.billRepository.deleteAll();
    }

    public String createBillAndReturnPreviewLink(Bill bill) throws DocumentException, IOException {
        Bill storedBill = this.createBill(bill);
        return this.pdfService.savePDF(storedBill);
    }
}
