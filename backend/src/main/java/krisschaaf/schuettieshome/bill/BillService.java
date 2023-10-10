package krisschaaf.schuettieshome.bill;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillService {
    private BillRepository billRepository;

    @Autowired
    public BillService(BillRepository billRepository) {
        this.billRepository = billRepository;
    }

    public void createBill(Bill bill) {
        // TODO create preview of Bill and return
        // https://www.codejava.net/frameworks/spring-boot/pdf-export-example
    }

    public void addBill(Bill bill) {
        this.billRepository.save(bill);
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
}
