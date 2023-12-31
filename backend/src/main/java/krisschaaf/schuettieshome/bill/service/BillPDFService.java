package krisschaaf.schuettieshome.bill.service;

import krisschaaf.schuettieshome.bill.model.BillPDF;
import krisschaaf.schuettieshome.bill.model.BillPDFNoDataDTO;
import krisschaaf.schuettieshome.bill.repository.BillPDFRepository;
import krisschaaf.schuettieshome.bill.utils.Converter;
import krisschaaf.schuettieshome.customer.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BillPDFService {

    private BillPDFRepository billPDFRepository;

    @Autowired
    public BillPDFService(BillPDFRepository billPDFRepository) {
        this.billPDFRepository = billPDFRepository;
    }

    public void savePdf(MultipartFile file, Customer customer) {
        try {
            Date creationDate = new Date();
            String billName = customer.getLastname() + "-" + customer.getFirstname() + "_" + Converter.dateToString(creationDate);
            BillPDF billPDF = new BillPDF(billName, creationDate, file.getBytes(), customer);
            this.billPDFRepository.save(billPDF);
        } catch (IOException e) {
         e.printStackTrace();
        }
    }

    public BillPDF getPdf(String id) {
        return this.billPDFRepository.findById(id).orElseThrow(() -> new RuntimeException("BillPDF not found."));
    }

    public List<BillPDFNoDataDTO> getAllPdfs() {
        return this.billPDFRepository.findAll().stream()
                .map(
                    billPDF -> new BillPDFNoDataDTO(
                            billPDF.getId(),
                            billPDF.getName(),
                            billPDF.getCreationDate(),
                            billPDF.getCustomer().getFirstname(),
                            billPDF.getCustomer().getLastname()))
                .collect(Collectors.toList());
    }

    public void deleteBillPDFById(String id) {
        this.billPDFRepository.deleteById(id);
    }
}