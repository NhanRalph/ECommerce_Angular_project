import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { CardProductComponent } from './components/card-product/card-product.component';
import { HttpClientModule } from '@angular/common/http';

//Prime NG
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { NavbarComponent } from './shared/layouts/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EffectsModule } from '@ngrx/effects';
import { ProductEffect } from './shared/store/productStore/product.effect';
import { HomepageComponent } from './shared/layouts/homepage/homepage.component';
import { SliderComponent } from './components/slider/slider.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import {
  cartReducer,
  checkoutCartReducer,
} from './shared/store/cartStore/cart.reducer';
import { productReducer } from './shared/store/productStore/product.reducer';
import { CartEffect } from './shared/store/cartStore/cart.effect';
import { CartpageComponent } from './shared/layouts/cartpage/cartpage.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutPageComponent } from './shared/layouts/checkout-page/checkout-page.component';
import { AddressComponent } from './components/address/address.component';
import { CheckoutListComponent } from './components/checkout-list/checkout-list.component';
import { HistoryOrderComponent } from './components/history-order/history-order.component';
import { environment } from 'src/environment/environment.prod';
import { SigninModule } from './shared/layouts/signin/signin.module';
@NgModule({
  declarations: [
    AppComponent,
    CardProductComponent,
    NavbarComponent,
    HomepageComponent,
    SliderComponent,
    CartpageComponent,
    CartComponent,
    CheckoutPageComponent,
    AddressComponent,
    CheckoutListComponent,
    HistoryOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
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

    StoreModule.forRoot({
      checkoutCart: checkoutCartReducer,
      cartQuantity: cartReducer,
      products: productReducer,
    }),
    EffectsModule.forRoot([ProductEffect, CartEffect]),

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,

    SigninModule,
  ],
  providers: [Storage],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
