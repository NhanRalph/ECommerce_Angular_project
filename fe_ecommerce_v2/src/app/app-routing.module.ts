import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './shared/layouts/homepage/homepage.component';
import { CartpageComponent } from './shared/layouts/cartpage/cartpage.component';
import { CheckoutPageComponent } from './shared/layouts/checkout-page/checkout-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomepageComponent,
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('./shared/layouts/signin/signin.module').then(
        (m) => m.SigninModule
      ),
  },
  {
    path: 'cart',
    component: CartpageComponent,
  },

  {
    path: 'checkout',
    component: CheckoutPageComponent,
  },

  // Wildcard route to redirect to HomepageComponent for all other paths
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
