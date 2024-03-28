import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPage } from './MainPage/main';
import { StorePageComponent } from './StorePage/storePage.component';
import { AdminComponent } from './Admin/Admin.component';
import { DashboardAdminComponent } from './Admin/Dashboard/dashboard.component';
import { OrdersAdminComponent } from './Admin/Orders/orders.component';
import { ProductOrderAdminComponent } from './Models/itemOrderAdmin/itemOrderAdmin.component';
import { CustomerAdminComponent } from './Admin/Customer/customer.component';
import { MassageAdminComponent } from './Admin/Massage/massage.component';
import { AddNewProduct } from './Admin/addNewProduct/addNewProduct.component';

const routes: Routes = [
  {path: '', component: MainPage},
  {path: 'store/:productType', component: StorePageComponent},
  {path: 'admin', component: AdminComponent, children: [
    {path:'dashboard', component: DashboardAdminComponent},
    {path: 'order', component: OrdersAdminComponent},
    {path: 'product', component: ProductOrderAdminComponent},
    {path: 'customer', component: CustomerAdminComponent},
    {path: 'massage', component: MassageAdminComponent},
    {path: 'addnewproduct', component: AddNewProduct}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
