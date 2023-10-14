package krisschaaf.schuettieshome.bill.service;

import krisschaaf.schuettieshome.bill.model.Bill;
import krisschaaf.schuettieshome.bill.repository.BillRepository;
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
}
