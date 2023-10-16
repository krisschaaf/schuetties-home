package krisschaaf.schuettieshome.bill.controller;

import krisschaaf.schuettieshome.api.Api;
import krisschaaf.schuettieshome.bill.model.Bill;
import krisschaaf.schuettieshome.bill.service.BillService;
import krisschaaf.schuettieshome.bill.service.PDFService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.List;

@RestController
@RequestMapping(Api.BILL_PATH)
public class BillController {
    private BillService billService;
    private PDFService pdfService;

    @Autowired
    public BillController(BillService billService,
                          PDFService pdfService) {
        this.billService = billService;
        this.pdfService = pdfService;
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public Bill createBill(@RequestBody Bill bill) {
        return this.billService.createBill(bill);
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

    @PostMapping("/getPreview")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<byte[]> createPreview(@RequestBody Bill bill) throws UnsupportedEncodingException {
        var storedBill = this.billService.createBill(bill);

        var headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", storedBill.getId() + ".pdf");
        return ResponseEntity.ok()
                .headers(headers)
                .body(this.pdfService.createPDFByteArray(storedBill));
    }
}
