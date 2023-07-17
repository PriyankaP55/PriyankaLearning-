import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from '../../components/admin-dashboard/admin-dashboard.component';
import { AddItemsComponent } from '../../components/add-items/add-items.component';
import { ManageOrdersComponent } from '../../components/manage-orders/manage-orders.component';

const routes: Routes = [

  {path:'admin-dashboard', component:AdminDashboardComponent},
  {path:'add-items', component:AddItemsComponent},
  {path:'manage-orders', component:ManageOrdersComponent},

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
