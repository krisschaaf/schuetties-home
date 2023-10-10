package krisschaaf.schuettieshome.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers/customer")
public class CustomerController {

    private CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public void createCustomer(@RequestBody Customer customer) {
        this.customerService.createCustomer(customer);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Customer getCustomerById(@PathVariable String id) {
        return this.customerService.getCustomerById(id);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<Customer> getAllCustomers() {
        return this.customerService.getAllCustomers();
    }

    @PutMapping()
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void editCustomer(@RequestBody Customer customer) {
        this.customerService.editCustomer(customer);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteCustomerByID(@PathVariable String id) {
        this.customerService.deleteCustomerById(id);
    }
}
