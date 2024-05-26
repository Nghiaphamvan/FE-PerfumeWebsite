import { Component, Input } from "@angular/core";
import { ProductType } from "../../../DataType/ProductType";
import { OnInit } from "@angular/core";
import { MyService } from "../../Service/my-services.service";
import { fullScreenService } from "../../Service/fullscreenServices";
import { DataService } from "../../Service/share-data-component.service";
@Component({
    selector: 'item-product',
    templateUrl: './itemProduct.component.html',
    styleUrl: './itemProduct.component.scss'
})
export class ItemProductComponent{
    constructor(
        private myService: MyService,
        private fss: fullScreenService,
        private datashare: DataService  
    ){}

    @Input() Product!: ProductType;
    isDiscount: boolean = false;
    isOldPrice: boolean = false;
    @Input() percentSale!: number;
    onMouse: boolean = true;
    onClickAddCart : string = "shopping_bag";

    ngOnInit() {
        this.getPercentSaleByID(this.Product.id);
    }

    onMouseEnter() {
        this.onMouse = !this.onMouse;
    }

    onMouseLeave() {
        this.onMouse = !this.onMouse;
    }

    passIdProduct(productid : number) {
        this.fss.openDetail(productid);
    }
    
    AddToCartAtMainPage(product: any) {
        this.onClickAddCart = "check_circle";
        setTimeout(() => {
            this.onClickAddCart = "shopping_bag"
        }, 2000);
        const user = this.datashare.getUserInfo();
        this.myService.AddProductToCart(user.email, this.Product.id);
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