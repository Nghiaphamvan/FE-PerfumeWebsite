import { Component } from "@angular/core";
import { MyService } from "../../Service/my-services.service";
import { error } from "console";
import { Router } from "@angular/router";
import { DataService } from "../../Service/share-data-component.service";

@Component({
    selector: 'brands',
    templateUrl:'./brands.component.html',
    styleUrl: './brands.component.scss'
}) export class BrandComponent {
   
    Brands: string[] = [];
    constructor(private myService: MyService, private route: Router, private dataService: DataService) {}
  
    ngOnInit() {
        this.getAllBrands();
    }

    directProductBrand(brand: string) {
        this.route.navigate(['/store/perfume']);
        this.dataService.setPerfumeBrandFromBrandPage(brand);
    }

    getAllBrands() {
        this.myService.getAllBrands().subscribe(data => {
            console.log("success brand from brands component");
            this.Brands = data;
            console.log(this.Brands);
        }, error => {
            console.log(error);
        })
    }
}