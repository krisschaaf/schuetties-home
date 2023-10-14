//package krisschaaf.schuettieshome.bill.service;
//
//import krisschaaf.schuettieshome.bill.model.PDFCarBill;
//import krisschaaf.schuettieshome.bill.repository.PDFCarBillRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.util.StringUtils;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.util.stream.Stream;
//
//@Service
//public class PDFCarBillService {
//
//    @Autowired
//    private PDFCarBillRepository PDFCarBillRepository;
//
//    public PDFCarBill getFile(String id) {
//        return PDFCarBillRepository.findById(id).orElseThrow(() -> new RuntimeException("File could not be found"));
//    }
//
//    public Stream<PDFCarBill> getAllFiles() {
//        return PDFCarBillRepository.findAll().stream();
//    }
//
//    public void savePDFInDB(MultipartFile file) throws IOException {
//        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
//        PDFCarBill PDFCarBill = new PDFCarBill(fileName, file.getContentType(), file.getBytes());
//        this.PDFCarBillRepository.save(PDFCarBill);
//    }
//}
