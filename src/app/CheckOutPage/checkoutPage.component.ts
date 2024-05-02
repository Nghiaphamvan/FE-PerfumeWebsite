import { Component, ElementRef, ViewChild } from "@angular/core";
import { MyService } from "../Service/my-services.service";
import { UserType } from "../../DataType/UserType";
import { DataService } from "../Service/share-data-component.service";
import { CartType } from "../../DataType/CartType";
import { Observable } from "rxjs";
import { processCheckOutType } from "../../DataType/ProductType";
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from "../Models/Alert/alert-service";
export interface PassData {
    value: number;
    idProduct: number;
    quantity: number;
    checked: boolean;
}
@Component({
    selector: 'checkout-page',
    templateUrl:'./checkoutPage.component.html',
    styleUrl: './checkoutPage.component.scss'
}) export class CheckoutPageComponent {
    Shipping: number = 0;
    Checkout: number = 0;
    PassedData?: PassData ;
    UserInfo: UserType = this.dataService.getUserInfo();
    total:number = 0;
    selectedValue:string = "1";

    clickIconDelivery: boolean[] = [true, false, false, false];

    @ViewChild('divcontainerall') scrollContainer!: ElementRef;
    

    constructor(private myServer: MyService, private dataService: DataService){
        this.getCarts();
    }
    Carts!: CartType[];
    CartsChecked: PassData[] = [];
    cartsCheckedCheckout!:CartType[];

    caculatorTotal() {}

    private getData(serviceCall: Observable<any>, callback?: (data: any) => void): void {
        serviceCall.subscribe(data => {
            if (callback) {
                callback(data);
            }
        }, error => {
            console.log(error);
        });
    }
    
    handleAddToCart(eventData: PassData) {
        this.PassedData = eventData;
        let sumCart = 0;
        if (this.PassedData && this.PassedData.checked) {
            this.CartsChecked.push(this.PassedData);
        } else if (this.PassedData) {
            this.CartsChecked = this.CartsChecked.filter(cart => cart.checked);
        }
        
        for(let c of this.CartsChecked) {
            sumCart += c.value*c.quantity;
        }
        
        this.total = sumCart;
        this.Checkout = this.total + this.Shipping;
        const index = this.Carts.findIndex(item => item.PerfumeDetailID === this.PassedData?.idProduct && item.Quantity !== this.PassedData.quantity);
        console.log(index);
        if (index !== -1) {
            this.Carts[index].Quantity = this.PassedData.quantity;
        }
    }

    // ProcessCartype2(eventData: processCheckOutType) {
    //     console.log(eventData);
    //     const { idProduct, respon } = eventData;
    //     const index = this.cartsCheckedCheckout.findIndex(item => item.PerfumeDetailID === idProduct);
    //     if (index !== -1) {
    //         if (respon === 0) {
    //             this.cartsCheckedCheckout = this.cartsCheckedCheckout.filter(item => item.PerfumeDetailID !== idProduct);
    //         } else {
    //             this.cartsCheckedCheckout[index].Quantity += respon;
    //             const i = this.CartsChecked.findIndex(item => item.idProduct === this.cartsCheckedCheckout[index].PerfumeDetailID);
    //             this.total += this.CartsChecked[i].value*respon;     
    //             this.Checkout = this.total + this.Shipping;       
    //         }
    //     }
    // }
    ProcessCartype2(eventData: processCheckOutType) {
        const { idProduct, respon } = eventData;
        const index = this.cartsCheckedCheckout.findIndex(item => item.PerfumeDetailID === idProduct);
    
        if (index !== -1) {
            if (respon === 0) {
                this.cartsCheckedCheckout = this.cartsCheckedCheckout.filter(item => item.PerfumeDetailID !== idProduct);
                const cartCheckedIndex = this.CartsChecked.findIndex(item => item.idProduct === idProduct);
                this.total -= this.CartsChecked[cartCheckedIndex].value * this.CartsChecked[cartCheckedIndex].quantity;
                this.Checkout = this.total + this.Shipping;
            } else {
                this.cartsCheckedCheckout[index].Quantity += respon;
                const cartCheckedIndex = this.CartsChecked.findIndex(item => item.idProduct === idProduct);
                if (cartCheckedIndex !== -1) {
                    this.total += this.CartsChecked[cartCheckedIndex].value * respon;
                    this.Checkout = this.total + this.Shipping;
                }
            }
        } else {
            alert('Lỗi rùi bạn iu');
        }
    }
    



    reloadData(eventData: number) {
        console.log('reload from component parent');
        this.Carts = this.Carts.filter(c => c.CartID != eventData);
    }

    preprocessingCart(carts: CartType[]) {
        const uniquaCart : CartType[]= [];
        for(const cart of carts) {
            const existingCartIndex = uniquaCart
        }
    }

    CheckOutActive() {
        if(this.Checkout != 0) {
            if (this.scrollContainer) {
                const container = this.scrollContainer.nativeElement as HTMLElement;
                container.scrollLeft += 1220; 
                this.filterCartChecked();
            }
        }
    }

    BackCheckOutActive() {
        if (this.scrollContainer) {
            const container = this.scrollContainer.nativeElement as HTMLElement;
            container.scrollLeft -= 1220; 
        }
    }

    private getCarts() {
        this.getData(this.myServer.GetAllCartsByCustomerID(this.UserInfo.id), data => {
            this.Carts = data;
        })
    }

    filterCartChecked() {
        this.cartsCheckedCheckout = this.Carts.filter(item => this.CartsChecked.find(i => i.idProduct === item.PerfumeDetailID));
    }

    isclickedIconDelivery(index: number) {
        this.clickIconDelivery.fill(false);
        this.clickIconDelivery[index] = true;
    }
}