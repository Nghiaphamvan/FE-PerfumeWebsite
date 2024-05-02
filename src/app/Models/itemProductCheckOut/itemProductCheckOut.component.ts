import { Component, Output, EventEmitter, Input } from "@angular/core";
import { UserType } from "../../../DataType/UserType";
import { CartType } from "../../../DataType/CartType";
import { ProductType } from "../../../DataType/ProductType";
import { MyService } from "../../Service/my-services.service";
import { Observable } from "rxjs";

export interface PassData {
    value: number;
    idProduct: number;
    quantity: number;
    checked: boolean;
}
@Component({
    selector: 'item-product-checkout',
    templateUrl: './itemProductCheckOut.component.html',
    styleUrl: './itemProductCheckOut.component.scss'
}) export class ItemProductCheckOutComponent {
    constructor(private myService: MyService) {}

    @Output() getPrice = new EventEmitter<PassData>();
    @Output() CallBackReloadProduct = new EventEmitter<number>();

    model: PassData = {
        value: 0,
        idProduct: 0,
        quantity: 1,
        checked: false
    };

    @Input() cart!: CartType;
    productInfo: ProductType = {
        id: 0,
        name: '',
        price: 0,
        url: '',
        volume: 0,
        description: '',
        brand: '',
        notes: '',
    };
    percentSale!: number;
    isOldPrice: boolean = false;

    ngOnInit() {
        this.getProduct();
    }

    private getData(serviceCall: Observable<any>, callback?: (data: any) => void): void {
        serviceCall.subscribe(data => {
            if (callback) {
                callback(data);
            }
        }, error => {
            console.log(error);
        });
    }

    private getPercentSaleByID(id: number): any {
        this.myService.getPercentSaleByID(id).subscribe(data => {
            this.percentSale = data;
            if(this.percentSale != 0) {
                this.isOldPrice = true;
            }
        }, error => {
            console.log(error);
        })
    }

    getProduct() {
        this.getData(this.myService.getProductByID(this.cart.PerfumeDetailID), data => {
            this.productInfo = data;
            this.model.value = this.productInfo.price;
            this.model.idProduct = this.productInfo.id;
            this.model.quantity = this.cart.Quantity;
        });
    }

    UpdateQuantity(re: string) {

        if(this.model.quantity == 1 && re == "minus") {
            this.model.quantity -= 1;
            this.myService.UpdateCart(this.productInfo.id, re);
            this.ReloadProduct(this.productInfo.id);
            console.log('this quantity = 0');
        } else {
            re==='plus'?this.model.quantity+=1: this.model.quantity-=1;
            this.myService.UpdateCart(this.productInfo.id, re);
        }
        this.getPrice.emit(this.model);
    }

    DeleteCart() {
        console.log('Delte')
        this.myService.DeleteCart(this.cart.CartID);
        this.model.quantity = 0;
    }

    ReloadProduct(index: number) {
        this.CallBackReloadProduct.emit(index);
    }

    isTargetValid(event: MouseEvent): boolean {
        const target = event.target as HTMLElement;
        return target === event.currentTarget ||
               target.classList.contains('info-product') ||
               target.classList.contains('price-product') ||
               target.classList.contains('img-product-checkout');
      }
    
    activeClick(event: MouseEvent) {
        if (this.isTargetValid(event)) {
            this.model.checked = !this.model.checked ;
            console.log(this.model);
            this.getPrice.emit(this.model);
        }
    }
    
}