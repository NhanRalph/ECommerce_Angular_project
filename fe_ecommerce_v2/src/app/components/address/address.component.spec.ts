import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressComponent } from './address.component';
import { AddressService } from '../../shared/services/address/address.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';

const originalConsoleError = console.error;
const jsDomCssError = 'Error: Could not parse CSS stylesheet';
console.error = (...params) => {
  if (!params.find((param) => param.toString().includes(jsDomCssError))) {
    originalConsoleError(...params);
  }
};

describe('AddressComponent', () => {
  let component: AddressComponent;
  let fixture: ComponentFixture<AddressComponent>;
  let addressService: AddressService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddressComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,

        InputTextModule,
        ButtonModule,
        CardModule,
        BadgeModule,
        ProgressSpinnerModule,
        DialogModule,
        BrowserAnimationsModule,
        TableModule,
        CheckboxModule,
      ],
      providers: [AddressService], // provide any required services here
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressComponent);
    component = fixture.componentInstance;
    addressService = TestBed.inject(AddressService); // inject AddressService
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch address on initialization', () => {
    const mockAddress = {
      user_id: 1,
      client_name: 'Đào Nguyễn Huy Nhân',
      client_phone: '0908961308',
      address_id: 20,
      address: '85A, phố 6, ấp 3, xã Phú Vinh',
      city: 'Định Quán',
      country: 'Đồng Nai',
    };

    const spy = jest.spyOn(addressService, 'getAddress');
    spyOn(addressService, 'getAddress').and.returnValue(of(mockAddress));

    component.ngOnInit();

    expect(addressService.getAddress).toHaveBeenCalledWith(1);
    // expect(component.address).toEqual(mockAddress);
  });

  // it('should show dialog if user_id is 0 on initialization', () => {
  //   spyOn(addressService, 'getAddress').and.returnValue(of({ user_id: 0 }));

  //   component.ngOnInit();

  //   expect(component.visible).toBe(true);
  // });

  // it('should emit address when added', () => {
  //   const mockAddress = {
  //     user_id: 1,
  //     client_name: 'John Doe',
  //     client_phone: '123456789',
  //     address_id: 1,
  //     address: '123 Street',
  //     city: 'City',
  //     country: 'Country',
  //   };
  //   spyOn(addressService, 'addNewAddress').and.returnValue(of(mockAddress));
  //   spyOn(component.addressChanged, 'emit');

  //   component.addNewAddress(mockAddress);

  //   expect(component.addressChanged.emit).toHaveBeenCalledWith(mockAddress);
  // });

  // it('should submit form and add new address', () => {
  //   const mockAddress = {
  //     user_id: 1,
  //     client_name: 'John Doe',
  //     client_phone: '123456789',
  //     address_id: 1,
  //     address: '123 Street',
  //     city: 'City',
  //     country: 'Country',
  //   };
  //   spyOn(addressService, 'addNewAddress').and.returnValue(of(mockAddress));
  //   spyOn(component.addressChanged, 'emit');
  //   const submitSpy = spyOn(component, 'onSubmit').and.callThrough();

  //   component.addressForm.setValue({
  //     client_name: 'John Doe',
  //     client_phone: '123456789',
  //     address: '123 Street',
  //     city: 'City',
  //     country: 'Country',
  //   });
  //   component.onSubmit();

  //   expect(submitSpy).toHaveBeenCalled();
  //   expect(addressService.addNewAddress).toHaveBeenCalledWith(mockAddress);
  //   expect(component.addressChanged.emit).toHaveBeenCalledWith(mockAddress);
  // });
});
