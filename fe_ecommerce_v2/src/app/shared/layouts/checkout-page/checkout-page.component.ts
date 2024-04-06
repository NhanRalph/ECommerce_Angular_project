import { Component, OnInit } from '@angular/core';
import { Address } from '../../services/address/address.model';
import { AddressService } from '../../services/address/address.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit {
  address: Address = {
    user_id: 0,
    client_name: '',
    client_phone: '',
    address_id: 0,
    address: '',
    city: '',
    country: '',
  };

  constructor(private addressService: AddressService) {}

  ngOnInit(): void {
    this.fetchAddress();
  }

  fetchAddress() {
    this.addressService.getAddress().subscribe((address) => {
      this.address = address;
    });
  }
}
