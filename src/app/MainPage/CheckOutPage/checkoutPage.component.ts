import { Component, ElementRef, ViewChild } from "@angular/core";
import { MyService } from "../../Service/my-services.service";
import { UserType } from "../../../DataType/UserType";
import { DataService } from "../../Service/share-data-component.service";
import { CartType } from "../../../DataType/CartType";
import { Observable, Subscription } from "rxjs";
import { processCheckOutType } from "../../../DataType/ProductType";
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from "../../Models/Alert/alert-service";
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
    
    onGetEmailSubt: Subscription;

    clickIconDelivery: boolean[] = [true, false, false, false];

    checkoutclicked:boolean = false;
    Carts!: CartType[];
    cartsCheckedCheckout!:CartType[];

    CartsChecked: PassData[] = [];

    @ViewChild('divcontainerall') scrollContainer!: ElementRef;
    

    constructor(private myServer: MyService, private dataService: DataService){
        this.Carts = [];
        this.cartsCheckedCheckout = [];
        this.onGetEmailSubt = this.dataService.onGetEmailSubject().subscribe(data => {
            this.getCarts();
        })
    }
    private getCarts() {
        const user = this.dataService.getUserInfo();
        console.log(user);

        this.getData(this.myServer.getAllCartsByEmail(user.email), response => {
            this.Carts = response;
            console.log(this.Carts);
        })
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
    
    handleAddToCart(eventData: PassData) {
        this.PassedData = eventData;
        let sumCart = 0;
        if (this.PassedData && this.PassedData.checked) {
            // this.ProcessCartype(eventData.idProduct);
            this.CartsChecked.push(this.PassedData);
            console.log('passed dataa', this.PassedData);
            console.log('carts', this.Carts);
            const v = this.Carts.findIndex(p => p.PerfumeDetailID == this.PassedData?.idProduct);
            if(v !== -1) {
                this.cartsCheckedCheckout.push(this.Carts[v]);
            }

            console.log('cart checked check out', this.cartsCheckedCheckout);
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

    ProcessCartype(productId: number) {
        console.log('asdasd',this.cartsCheckedCheckout);
        const index = this.cartsCheckedCheckout.findIndex(p => p.PerfumeDetailID == productId);
        if(index !== -1) {
            const indexcart = this.Carts.findIndex(p => p.PerfumeDetailID === productId);
            this.cartsCheckedCheckout.push(this.Carts[indexcart]);
        } else this.cartsCheckedCheckout.filter(p => p.PerfumeDetailID !== productId);
    }

    ProcessCartype2(eventData: processCheckOutType) {
        const { idProduct, respon } = eventData;
        const index = this.cartsCheckedCheckout.findIndex(item => item.PerfumeDetailID === idProduct);
    
        if (index !== -1) {
            console.log('length', this.cartsCheckedCheckout.length);
            if (respon === 0) {
                this.cartsCheckedCheckout = this.cartsCheckedCheckout.filter(item => item.PerfumeDetailID !== idProduct);
                if(this.cartsCheckedCheckout.length === 0) {
                    this.backCheckOutActive();
                } else {
                    const cartCheckedIndex = this.CartsChecked.findIndex(item => item.idProduct === idProduct);
                    this.total -= this.CartsChecked[cartCheckedIndex].value * this.CartsChecked[cartCheckedIndex].quantity;
                    this.Checkout = this.total + this.Shipping; 
                }
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
            this.checkoutclicked =  !this.checkoutclicked;
        }
    }

    backCheckOutActive() {
        this.checkoutclicked =  !this.checkoutclicked;
        this.refreshPage();
       
    }

    refreshPage() {
        this.Checkout = 0;
        this.total = 0;
        this.CartsChecked = [];
        this.cartsCheckedCheckout = [];

    }

    filterCartChecked() {
        this.cartsCheckedCheckout = this.Carts.filter(item => this.CartsChecked.find(i => i.idProduct === item.PerfumeDetailID));
    }

    isclickedIconDelivery(index: number) {
        this.clickIconDelivery.fill(false);
        this.clickIconDelivery[index] = true;
    }
}