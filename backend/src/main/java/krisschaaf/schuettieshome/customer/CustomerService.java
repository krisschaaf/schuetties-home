package krisschaaf.schuettieshome.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    private CustomerRepository customerRepository;

    @Autowired
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public void createCustomer(Customer customer) {
        this.customerRepository.save(customer);
    }

    public Customer getCustomerById(String id) {
        return this.customerRepository.findById(id).orElseThrow(() -> new RuntimeException());
    }

    public List<Customer> getAllCustomers() {
        return this.customerRepository.findAll();
    }

    public void deleteCustomerById(String id) {
        this.customerRepository.deleteById(id);
    }

    public void editCustomer(Customer customer) {
        this.customerRepository.save(customer);
    }
}
