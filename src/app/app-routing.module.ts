import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPage } from './MainPage/main';
import { StorePageComponent } from './MainPage/StorePage/storePage.component';
import { AdminComponent } from './Admin/Admin.component';
import { DashboardAdminComponent } from './Admin/Dashboard/dashboard.component';
import { OrdersAdminComponent } from './Admin/Orders/orders.component';
import { ProductOrderAdminComponent } from './Models/itemOrderAdmin/itemOrderAdmin.component';
import { CustomerAdminComponent } from './Admin/Customer/customer.component';
import { MassageAdminComponent } from './Admin/Massage/massage.component';
import { AddNewProduct } from './Admin/addNewProduct/addNewProduct.component';
import { BrandComponent } from './MainPage/Brands/brands.component';
import { CheckoutPageComponent } from './MainPage/CheckOutPage/checkoutPage.component';
import { UserComponent } from './MainPage/User/User.component';
import { addressUserComponent } from './MainPage/User/childComponent/address/address.component';
import { changePasswordComponent } from './MainPage/User/childComponent/changePassword/changePassword.component';
import { MyProfileComponent } from './MainPage/User/childComponent/myProfile/myProfile.component';
import { PurchaseOrderComponent } from './MainPage/User/childComponent/purchaseOrder/purchaseOrder.component';

const routes: Routes = [
  {path: '', component: MainPage},
  {path: 'brand', component: BrandComponent},
  {path: 'store/:productType', component: StorePageComponent},
  {path: 'cart', component: CheckoutPageComponent},
  {path: 'user', component: UserComponent, children: [
    {path: 'address', component: addressUserComponent},
    {path: 'changepassword', component: changePasswordComponent},
    {path: '', component: MyProfileComponent},
    {path: 'purchaseorder', component: PurchaseOrderComponent},
  ]},
  {path: 'admin', component: AdminComponent, children: [
    {path:'dashboard', component: DashboardAdminComponent},
    {path: 'order', component: OrdersAdminComponent},
    {path: 'product', component: ProductOrderAdminComponent},
    {path: 'customer', component: CustomerAdminComponent},
    {path: 'massage', component: MassageAdminComponent},
    {path: 'addnewproduct', component: AddNewProduct},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
