import { Component, Input, SimpleChanges } from "@angular/core";
import { ProductType } from "../../../DataType/ProductType";
import { fullScreenService } from "../../Service/fullscreenServices";
import { MyService } from "../../Service/my-services.service";
import { Subscription } from "rxjs";


@Component({
    selector:'detail-product',
    templateUrl:'./detailProduct.component.html',
    styleUrl:'./detailProduct.component.scss'
}) export class DetailProductComponent {

    @Input() idProduct: number = -1;
    quantity: number = 1;
    infoDetailProduct: ProductType = {id: 0,
        name: "",
        price: 0,
        url: '',
        volume: 0,
        description: 'stringnumber',
        brand: 'stringnumber',
        notes: 'stringnumber',
    };

    CurrentProduct: ProductType = {id: 0,
        name: "",
        price: 0,
        url: '',
        volume: 0,
        description: 'stringnumber',
        brand: 'stringnumber',
        notes: 'stringnumber',
    };


    volumeProduct: ProductType[] = [];
    salePercent: number = 0;
    
    constructor(private dff:fullScreenService, private myservice: MyService) {}

    ngOnInit() {
        this.GetDatabyId(this.idProduct);
        this.GetPercentById(this.idProduct);
        this.GetVolume();
    }

    PostProduct() {

    }


    
    clickVolume(v:number) {
        console.log('click asdasds');
        const index = this.volumeProduct.findIndex(p => p.volume === v);
        this.CurrentProduct = this.volumeProduct[index];
    }

    GetVolume() {
        if (typeof localStorage !== 'undefined') {
            this.myservice.getData(this.myservice.GetAllData(), data => {
                this.volumeProduct = data;
                this.volumeProduct = this.volumeProduct.filter(p => p.name===this.infoDetailProduct.name && p.volume != this.infoDetailProduct.volume)
                this.volumeProduct.push(this.infoDetailProduct);
                this.volumeProduct.sort((a,b) => a.volume - b.volume)
            })
        }
    }

    GetDatabyId(v:number): void {
        if (typeof localStorage !== 'undefined') {
            this.myservice.getData(this.myservice.getProductByID(v), data => {
                this.infoDetailProduct = data;
                this.CurrentProduct = this.infoDetailProduct;
                
            })
        }
    }

    GetPercentById(v:number) {
        if (typeof localStorage !== 'undefined') {
            this.myservice.getData(this.myservice.getPercentSaleByID(v), data => {
                this.salePercent = data;
                console.log('asdasda', this.salePercent);
            })
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['idProduct']) {
          this.handleNewInfoDetailProduct(changes['idProduct'].currentValue);
        }
    }

    handleNewInfoDetailProduct(newInfo: any) {
        this.idProduct = newInfo;
    }

    addToCart() {
        console.log(this.quantity);
    }

    changeQuantity(v : number) {
        if(v === 1) {
            if(this.quantity >= 0 && this.quantity < 99) {
                this.quantity += v;
            }
        } else {
            if(this.quantity > 0 && this.quantity <=99) {
                this.quantity += v;
            }
        }
    }
}