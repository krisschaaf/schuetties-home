package krisschaaf.schuettieshome.customer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Customer {

    @Id
    private String id;

    private String salutation;
    private String firstname;
    private String lastname;
    private String email;
    private String telephonePrivate;
    private String telephoneBusiness;
    private String mobile;
    private String fax;
    private String street;
    private String housingNumber;
    private String postalCode;
    private String city;
    private String bankNumber;
    private String additionalInformation;
}
