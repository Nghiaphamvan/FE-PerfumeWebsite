import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPage } from './MainPage/main';
import { listItemVirticle } from './MainPage/listItemVirticle/listItemVirticle.component';
import { navBar } from './MainPage/navBar/navBar.component';
import { HeadLineInfo } from './MainPage/HeadLineInfo/HeadlineInfo.Component';
import { Attention } from './MainPage/Attention/Attention.component';
import { SwiperModule } from 'swiper/angular';
import { PolicylModule } from './MainPage/Attention/Policy/policy.module';
import { CarouselModule } from './MainPage/Carousel/Carousel.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
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
import {FormsModule} from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';

const MaterialComponents = [
  MatSlideToggleModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatChipsModule,
  MatRadioModule, FormsModule, MatSliderModule, MatCheckboxModule, MatCardModule
];
@NgModule({
  declarations: [
    AppComponent,
    MainPage,
    listItemVirticle,
    navBar,
    HeadLineInfo,
    Attention,
    AdminComponent,
    AddNewProduct,
    StorePageComponent,
    ItemProductComponent,
    ItemAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SwiperModule,
    CarouselModule,
    PolicylModule,
    MaterialComponents,
    HttpClientModule,
    
  ],
  providers: [
    provideAnimationsAsync(),
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
