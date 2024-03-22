import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPage } from './MainPage/main';
import { listItemVirticle } from './MainPage/listItemVirticle/listItemVirticle.component';
import { navBar } from './Header/navBar/navBar.component';
import { HeadLineInfo } from './Header/HeadLineInfo/HeadlineInfo.Component';
import { Attention } from './MainPage/Attention/Attention.component';
import { SwiperModule } from 'swiper/angular';
import { PolicylModule } from './MainPage/Attention/Policy/policy.module';
import { CarouselModule } from './MainPage/Carousel/Carousel.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { AdminComponent } from './Admin/Admin.component';
import { AddNewProduct } from './Admin/addNewProduct/addNewProduct.component';
import {MatChipsModule} from '@angular/material/chips';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './Service/auth.Service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { StorePageComponent } from './StorePage/storePage.component';
import { ItemProductComponent } from './Models/itemProduct/itemProduct.component';
import { ItemAdminComponent } from './Models/itemAdmin/itemAdmin.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatSliderModule} from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';

import {MatListModule} from '@angular/material/list';
import { CustomerAdminComponent } from './Admin/Customer/customer.component';
import { DashboardAdminComponent } from './Admin/Dashboard/dashboard.component';
import { MassageAdminComponent } from './Admin/Massage/massage.component';
import { OrdersAdminComponent } from './Admin/Orders/orders.component';
import { ProductsAdminComponent } from './Admin/Products/products.component';
import {MatBadgeModule} from '@angular/material/badge';
import { ProductOrderAdminComponent } from './Models/itemOrderAdmin/itemOrderAdmin.component';
import {NgxPaginationModule} from 'ngx-pagination';

const MaterialComponents = [
  MatSlideToggleModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatChipsModule,
  MatRadioModule, FormsModule, MatSliderModule, MatCheckboxModule, MatCardModule, FormsModule, ReactiveFormsModule, MatCheckboxModule, JsonPipe, MatListModule, 
  MatBadgeModule
];

const MainPageComponents = [
  MainPage, listItemVirticle, navBar, HeadLineInfo, Attention,
];

const ModelComponents = [
  ItemProductComponent, ItemAdminComponent, ProductOrderAdminComponent
];

const AdminComponents = [
  AdminComponent, CustomerAdminComponent, DashboardAdminComponent, MassageAdminComponent, OrdersAdminComponent, ProductsAdminComponent, AddNewProduct
];

const StoreComponents = [
  StorePageComponent,
];


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponents,
    StoreComponents,
    ModelComponents,
    AdminComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SwiperModule,
    CarouselModule,
    PolicylModule,
    MaterialComponents,
    HttpClientModule,    
    NgxPaginationModule,
    RouterModule.forRoot([
      { path: '', component: MainPage },
      { path: 'store/:productType', component: StorePageComponent },
    ])
  ],
  providers: [
    provideAnimationsAsync(),
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
