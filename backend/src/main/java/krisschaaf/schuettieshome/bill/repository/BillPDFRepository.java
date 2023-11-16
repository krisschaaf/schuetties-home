package krisschaaf.schuettieshome.bill.repository;

import krisschaaf.schuettieshome.bill.model.BillPDF;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BillPDFRepository extends MongoRepository<BillPDF, String> {
}
