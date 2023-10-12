package krisschaaf.schuettieshome.bill.repository;

import krisschaaf.schuettieshome.bill.model.Bill;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BillRepository extends MongoRepository<Bill, String> {
}
