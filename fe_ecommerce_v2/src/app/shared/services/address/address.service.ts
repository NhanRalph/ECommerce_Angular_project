import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Address } from './address.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  user_id: number | null;
  constructor(private http: HttpClient, private auth: AuthService) {
    this.user_id = this.auth.getUserId();
  }

  addNewAddress(address: Address): Observable<Address> {
    // Adjust the return type
    return this.http
      .post<Address>(`http://localhost:8080/address/add`, address)
      .pipe(
        // Specify the type of response
        map((address: Address) => {
          // Specify the type of parameter
          return {
            user_id: address.user_id,
            client_name: address.client_name,
            client_phone: address.client_phone,
            address_id: address.address_id,
            address: address.address,
            city: address.city,
            country: address.country,
          };
        })
      );
  }

  updateAddress(address: Address): Observable<Address> {
    return this.http.put<Address>(`http://localhost:8080/address/update`, {
      user_id: address.user_id,
      client_name: address.client_name,
      client_phone: address.client_phone,
      address_id: address.address_id,
      address: address.address,
      city: address.city,
      country: address.country,
    });
  }

  getAddress(): Observable<Address> {
    return this.http
      .get<Address[]>(`http://localhost:8080/address?user_id=${this.user_id}`)
      .pipe(
        map((addresses: Address[]) => {
          const address = addresses[0]; // Assuming you're only interested in the first address
          if (!address) {
            return {
              user_id: 0,
              client_name: '',
              client_phone: '',
              address_id: 0,
              address: '',
              city: '',
              country: '',
            };
          }
          return {
            user_id: address.user_id,
            client_name: address.client_name,
            client_phone: address.client_phone,
            address_id: address.address_id,
            address: address.address,
            city: address.city,
            country: address.country,
          };
        })
      );
  }
}
