import { Component, Input} from "@angular/core";
import { ProductType } from "../../../DataType/ProductType";
import { MyService } from "../../Service/my-services.service";
import { DataService } from "../../Service/share-data-component.service";
import { UserType } from "../../../DataType/UserType";

@Component({
    selector: 'item-product-type2',
    templateUrl: './itemProductType2.component.html',
    styleUrl: './itemProductType2.component.scss'
}) export class ItemProductType2Component {
    constructor(private myService: MyService, private dataService: DataService){}

    @Input() Product!: ProductType;
    isDiscount: boolean = false;
    isOldPrice: boolean = false;
    @Input() percentSale!: number;
    checked: boolean = false;

    userInfo: UserType = this.dataService.getUserInfo();

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

    ActiveaddProductToCart(){
        this.myService.AddProductToCart(this.userInfo.id, this.Product.id);
    }
}