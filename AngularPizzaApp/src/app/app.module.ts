import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserDashboardComponent } from './User/components/user-dashboard/user-dashboard.component';
import { MaterialModule } from './common/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './Admin/components/admin-dashboard/admin-dashboard.component';
import { UserCartComponent } from './User/components/user-cart/user-cart.component';
import { UserNavbarComponent } from './User/components/user-navbar/user-navbar.component';
import { AuthenticationGuard } from './common/gaurds/authentication.guard';
import { OrderPlacedComponent } from './User/components/order-placed/order-placed.component';
import { MyOrderComponent } from './User/components/my-order/my-order.component';
import { OrderTrackerComponent } from './User/components/order-tracker/order-tracker.component';
import { AddItemsComponent } from './Admin/components/add-items/add-items.component';
import { ManageOrdersComponent } from './Admin/components/manage-orders/manage-orders.component';
import { AdminNavBarComponent } from './Admin/components/admin-nav-bar/admin-nav-bar.component';
import { AddAddressComponent } from './User/components/add-address/add-address.component';
import { ViewUserAddressesComponent } from './User/components/view-user-addresses/view-user-addresses.component';
import { ErrorHandlerInterceptor } from './common/error-handler.interceptor';
import { PhoneMaskDirective } from './common/phone-mask.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    UserCartComponent,
    UserNavbarComponent,
    OrderPlacedComponent,
    MyOrderComponent,
    OrderTrackerComponent,
    AddItemsComponent,
    ManageOrdersComponent,
    AdminNavBarComponent,
    AddAddressComponent,
    ViewUserAddressesComponent,
    PhoneMaskDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [AuthenticationGuard, {provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
