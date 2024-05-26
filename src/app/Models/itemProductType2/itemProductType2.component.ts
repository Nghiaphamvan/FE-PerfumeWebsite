import { Component, Input} from "@angular/core";
import { ProductType } from "../../../DataType/ProductType";
import { MyService } from "../../Service/my-services.service";
import { DataService } from "../../Service/share-data-component.service";
import { UserType } from "../../../DataType/UserType";
import { fullScreenService } from "../../Service/fullscreenServices";

@Component({
    selector: 'item-product-type2',
    templateUrl: './itemProductType2.component.html',
    styleUrl: './itemProductType2.component.scss'
}) export class ItemProductType2Component {
    constructor(
        private myService: MyService,
        private dataService: DataService,
        private fss: fullScreenService,
        private datashare: DataService  
    ){}

    @Input() Product!: ProductType;
    isDiscount: boolean = false;
    isOldPrice: boolean = false;
    @Input() percentSale!: number;
    checked: boolean = false;
    onMouse: boolean = true;
    onClickAddCart : string = "shopping_bag";

    userInfo: UserType = this.dataService.getUserInfo();

    ngOnInit() {
        this.getPercentSaleByID(this.Product.id);
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

    onMouseEnter() {
        this.onMouse = !this.onMouse;
    }

    onMouseLeave() {
        this.onMouse = !this.onMouse;
    }

    ActiveaddProductToCart(){
        const result = this.dataService.getUserInfo();
        this.myService.AddProductToCart(result.email, this.Product.id);
    }
}