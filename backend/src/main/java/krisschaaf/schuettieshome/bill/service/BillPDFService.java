package krisschaaf.schuettieshome.bill.service;

import krisschaaf.schuettieshome.bill.model.BillPDF;
import krisschaaf.schuettieshome.bill.repository.BillPDFRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class BillPDFService {

    private BillPDFRepository billPDFRepository;

    @Autowired
    public BillPDFService(BillPDFRepository billPDFRepository) {
        this.billPDFRepository = billPDFRepository;
    }

    public void savePdf(MultipartFile file) {
        try {
            BillPDF billPDF = new BillPDF(file.getOriginalFilename(), file.getBytes());
            this.billPDFRepository.save(billPDF);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public BillPDF getPdf(String id) {
        return this.billPDFRepository.findById(id).orElseThrow(() -> new RuntimeException("BillPDF not found."));
    }

    public List<BillPDF> getAllPdfs() {
        return this.billPDFRepository.findAll();
    }
}