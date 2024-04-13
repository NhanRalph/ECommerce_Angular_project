import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './shared/layouts/homepage/homepage.component';
import { CartpageComponent } from './shared/layouts/cartpage/cartpage.component';
import { CheckoutPageComponent } from './shared/layouts/checkout-page/checkout-page.component';
import { AuthGuard } from './shared/services/auth/auth.guard';
import { AuthLoggedGuard } from './shared/services/auth/authLogged.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('./shared/layouts/signin/signin.module').then(
        (m) => m.SigninModule
      ),
    canActivate: [AuthLoggedGuard],
  },
  {
    path: 'cart',
    component: CartpageComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'checkout',
    component: CheckoutPageComponent,
    canActivate: [AuthGuard],
  },

  // Wildcard route to redirect to HomepageComponent for all other paths
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
