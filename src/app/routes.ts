import { Routes } from "@angular/router";
import { MainPage } from "./MainPage/main";
import { StorePageComponent } from "./StorePage/storePage.component";

const routeConfig: Routes = [
    {
        path: '',
        component: MainPage,
        title: "Main Page"
    },
    {
        path: 'store',
        component: StorePageComponent,
        title: "Store Page"
    }
];

export default routeConfig; 