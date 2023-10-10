package krisschaaf.schuettieshome.bill;

import krisschaaf.schuettieshome.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(Api.VERSION + "/bills/bill")
public class BillController {
    private BillService billService;

    @Autowired
    public BillController(BillService billService) {
        this.billService = billService;
    }

    @PostMapping("/getPreview")
    @ResponseStatus(HttpStatus.CREATED)
    public void createBill(@RequestBody Bill bill) {
        this.billService.createBill(bill);
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public void addBill(@RequestBody Bill bill) {
        this.billService.addBill(bill);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Bill getBillById(@PathVariable String id) {
        return this.billService.getBillById(id);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<Bill> getAllBills() {return this.billService.getAllCBills();
    }

    @PutMapping()
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void editBill(@RequestBody Bill bill) {
        this.billService.editBill(bill);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteBillByID(@PathVariable String id) {
        this.billService.deleteBillById(id);
    }

    @DeleteMapping()
    @ResponseStatus(HttpStatus.OK)
    public void deleteAll() {
        this.billService.deleteAll();
    }
}
