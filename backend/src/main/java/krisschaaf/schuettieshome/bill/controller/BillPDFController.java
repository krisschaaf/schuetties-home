package krisschaaf.schuettieshome.bill.controller;

import krisschaaf.schuettieshome.api.Api;
import krisschaaf.schuettieshome.bill.model.BillPDF;
import krisschaaf.schuettieshome.bill.model.BillPDFNoDataDTO;
import krisschaaf.schuettieshome.bill.service.BillPDFService;
import krisschaaf.schuettieshome.customer.Customer;
import krisschaaf.schuettieshome.customer.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping(Api.BILL_PDF_PATH)
public class BillPDFController {

    private BillPDFService billPDFService;
    private CustomerService customerService;

    @Autowired
    public BillPDFController(BillPDFService billPDFService, CustomerService customerService) {
        this.billPDFService = billPDFService;
        this.customerService = customerService;
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.OK)
    public void addBillPDF(@RequestParam("pdfFile") MultipartFile file, @RequestParam("customerId") String customerId) {
        Customer customer = this.customerService.getCustomerById(customerId);
        this.billPDFService.savePdf(file, customer);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public BillPDF getBillPDF(@PathVariable String id) {
        return this.billPDFService.getPdf(id);
    }

    @GetMapping("/data/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<byte[]> createPreview(@PathVariable String id) {
        BillPDF billPDF = this.billPDFService.getPdf(id);
        return ResponseEntity
                .accepted()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=" + billPDF.getName())
                .contentType(MediaType.APPLICATION_PDF)
                .body(billPDF.getData());
    }

    @GetMapping("/noData")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<BillPDFNoDataDTO> getAllBillPDFsNoData() { return this.billPDFService.getAllPdfs(); }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deleteBillPDFById(@PathVariable String id) { this.billPDFService.deleteBillPDFById(id); }
}