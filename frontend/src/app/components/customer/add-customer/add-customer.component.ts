import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer, CustomerDTO } from '../../../model/customer';
import { CustomerService } from '../../../services/customer.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  addCustomerForm!: FormGroup;

  constructor(private customerService: CustomerService, private notificationService: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.addCustomerForm = new FormGroup({
      salutationFormControl: new FormControl(''),
      surnameFormControl: new FormControl(''),
      lastnameFormControl: new FormControl(''),
      emailFormControl: new FormControl('', [Validators.email]),
      phonePrivateFormControl: new FormControl(''),
      phoneBusinessFormControl: new FormControl(''),
      mobileFormControl: new FormControl(''),
      faxFormControl: new FormControl(''),
      streetFormControl: new FormControl(''),
      housingNumberFormControl: new FormControl(''),
      postalCodeFormControl: new FormControl(''),
      cityFormControl: new FormControl(''),
      bankNumberFormControl: new FormControl(''),
      otherFormControl: new FormControl(''),
    });
  }

  get salutationFormControl() {
    return this.addCustomerForm.get('salutationFormControl') as FormControl;
  }

  get surnameFormControl() {
    return this.addCustomerForm.get('surnameFormControl') as FormControl;
  }

  get lastnameFormControl() {
    return this.addCustomerForm.get('lastnameFormControl') as FormControl;
  }

  get emailFormControl() {
    return this.addCustomerForm.get('emailFormControl') as FormControl;
  }

  get phonePrivateFormControl() {
    return this.addCustomerForm.get('phonePrivateFormControl') as FormControl;
  }

  get phoneBusinessFormControl() {
    return this.addCustomerForm.get('phoneBusinessFormControl') as FormControl;
  }

  get mobileFormControl() {
    return this.addCustomerForm.get('mobileFormControl') as FormControl;
  }

  get faxFormControl() {
    return this.addCustomerForm.get('faxFormControl') as FormControl;
  }

  get streetFormControl() {
    return this.addCustomerForm.get('streetFormControl') as FormControl;
  }

  get housingNumberFormControl() {
    return this.addCustomerForm.get('housingNumberFormControl') as FormControl;
  }

  get postalCodeFormControl() {
    return this.addCustomerForm.get('postalCodeFormControl') as FormControl;
  }

  get cityFormControl() {
    return this.addCustomerForm.get('cityFormControl') as FormControl;
  }

  get bankNumberFormControl() {
    return this.addCustomerForm.get('bankNumberFormControl') as FormControl;
  }

  get otherFormControl() {
    return this.addCustomerForm.get('otherFormControl') as FormControl;
  }

  buildCustomer(): CustomerDTO {
    return {
      salutation: this.salutationFormControl.value,
      surname: this.surnameFormControl.value,
      lastname: this.lastnameFormControl.value,
      email: this.emailFormControl.value,
      telephonePrivate: this.phonePrivateFormControl.value,
      telephoneBusiness: this.phoneBusinessFormControl.value,
      mobile: this.mobileFormControl.value,
      fax: this.faxFormControl.value,
      street: this.streetFormControl.value,
      housingNumber: this.housingNumberFormControl.value,
      postalCode: this.postalCodeFormControl.value,
      city: this.cityFormControl.value,
      bankNumber: this.bankNumberFormControl.value,
      additionalInformation: this.otherFormControl.value,
    }
  }

  onAddCustomerFormHandler(): void {
    this.customerService.addCustomer(this.buildCustomer()).subscribe({
      error: () => {
          this.notificationService.notifyError();
      },
      next: () => {
        this.notificationService.notify('Der Kunde wurde erfolgreich hinzugefügt!');
        this.router.navigateByUrl('/');
      },
    });
  }
}
