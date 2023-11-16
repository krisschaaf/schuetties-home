package krisschaaf.schuettieshome.bill.controller;

import krisschaaf.schuettieshome.api.Api;
import krisschaaf.schuettieshome.bill.model.BillPDF;
import krisschaaf.schuettieshome.bill.service.BillPDFService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(Api.BILL_PDF_PATH)
public class BillPDFController {

    private BillPDFService billPDFService;

    @Autowired
    public BillPDFController(BillPDFService billPDFService) {
        this.billPDFService = billPDFService;
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.OK)
    public void addBillPDF(@RequestParam("pdfFile") MultipartFile file) {
        this.billPDFService.savePdf(file);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public BillPDF getBillPDF(@PathVariable String id) {
        return this.billPDFService.getPdf(id);
    }

}