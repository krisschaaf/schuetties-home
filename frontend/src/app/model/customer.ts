export interface Customer {
    id: string;
    salutation: string;
    firstname: string;
    lastname: string;
    email: string;
    telephonePrivate: string;
    telephoneBusiness: string;
    mobile: string;
    fax: string;
    street: string;
    housingNumber: string;
    postalCode: string;
    city: string;
    bankNumber: string;
    additionalInformation: string;
}

export interface CustomerDTO {
    salutation: string;
    firstname: string;
    lastname: string;
    email: string;
    telephonePrivate: string;
    telephoneBusiness: string;
    mobile: string;
    fax: string;
    street: string;
    housingNumber: string;
    postalCode: string;
    city: string;
    bankNumber: string;
    additionalInformation: string;
}