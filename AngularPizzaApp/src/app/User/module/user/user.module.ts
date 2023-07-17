import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from '../../components/user-dashboard/user-dashboard.component';
import { UserCartComponent } from '../../components/user-cart/user-cart.component';
import { OrderPlacedComponent } from '../../components/order-placed/order-placed.component';
import { MyOrderComponent } from '../../components/my-order/my-order.component';
import { OrderTrackerComponent } from '../../components/order-tracker/order-tracker.component';
import { AddAddressComponent } from '../../components/add-address/add-address.component';

const routes: Routes = [

  {path:'user-dashboard', component:UserDashboardComponent},
  //{path:'user-dashboard', component:UserDashboardComponent},
  {path:'user-cart', component:UserCartComponent},
  {path:'order-placed', component:OrderPlacedComponent},
  {path:'my-orders', component:MyOrderComponent},
  {path:'order-tracker', component:OrderTrackerComponent},
  {path:'add-address', component:AddAddressComponent},

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule { }
