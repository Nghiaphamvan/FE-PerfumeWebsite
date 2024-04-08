import { Component } from "@angular/core";
import { MyService } from "../../Service/my-services.service";
import { error } from "console";
import { Router } from "@angular/router";

@Component({
    selector: 'brands',
    templateUrl:'./brands.component.html',
    styleUrl: './brands.component.scss'
}) export class BrandComponent {
   
    Brands: string[] = [];
    constructor(private myService: MyService) {}
  
    ngOnInit() {
        this.getAllBrands();
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