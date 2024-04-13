// address.component.ts
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Address } from 'src/app/shared/services/address/address.model';
import { AddressService } from '../../shared/services/address/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  @Input() address: Address = {
    user_id: 0,
    client_name: '',
    client_phone: '',
    address_id: 0,
    address: '',
    city: '',
    country: '',
  };

  @Output() addressChanged: EventEmitter<Address> = new EventEmitter<Address>();

  haveAddress: boolean = false;

  visible: boolean = false;

  addressForm = new FormGroup({
    client_name: new FormControl(''),
    client_phone: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
  });

  constructor(private addressService: AddressService) {}

  ngOnInit(): void {
    this.fetchAddress();
  }

  fetchAddress() {
    this.addressService.getAddress().subscribe((address) => {
      if (address.user_id === 0) {
        this.showDialog();
      } else {
        this.haveAddress = true;
        this.address = address;
        this.addressChanged.emit(this.address); // Emit the address when it's fetched
      }
    });
  }

  showDialog() {
    this.visible = true;
  }

  addNewAddress(address: Address) {
    this.addressService.addNewAddress(address).subscribe((data) => {
      this.address = data;
      this.addressChanged.emit(this.address); // Emit the address when it's added

      this.fetchAddress();
    });
  }

  updateAddress(address: Address) {
    this.addressService.updateAddress(address).subscribe((data) => {
      this.address = data;
      this.addressChanged.emit(this.address); // Emit the address when it's updated

      this.fetchAddress();
    });
  }

  changeAddress() {
    this.visible = true;
  }

  onSubmit() {
    this.address = {
      user_id: 1,
      client_name: this.addressForm.value.client_name as string,
      client_phone: this.addressForm.value.client_phone as string,
      address_id: 20,
      address: this.addressForm.value.address as string,
      city: this.addressForm.value.city as string,
      country: this.addressForm.value.country as string,
    };
    this.visible = false;
    if (this.haveAddress) {
      this.updateAddress(this.address);
    } else {
      this.addNewAddress(this.address);
    }
  }
}
