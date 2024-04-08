import { Component, Input } from "@angular/core";
import { ProductType } from "../../../DataType/ProductType";
import { OnInit } from "@angular/core";
import { MyService } from "../../Service/my-services.service";
@Component({
    selector: 'item-product',
    templateUrl: './itemProduct.component.html',
    styleUrl: './itemProduct.component.scss'
})
export class ItemProductComponent{
    constructor(private myService: MyService){}

    @Input() Product!: ProductType;
    isDiscount: boolean = false;
    isOldPrice: boolean = false;
    @Input() percentSale!: number;

    ngOnInit() {
        this.getPercentSaleByID(this.Product.id);
    }

    private getPercentSaleByID(id: number): any {
        this.myService.getPercentSaleByID(id).subscribe(data => {
            
            this.percentSale = data;
            if(this.percentSale != 0) {
                this.isDiscount = true;
                this.isOldPrice = true;
            }
        }, error => {
            console.log(error);
        })
    }
}