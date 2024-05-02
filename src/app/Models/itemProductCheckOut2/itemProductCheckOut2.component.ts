import { Component, Input, EventEmitter, Output } from "@angular/core";
import { CartType } from "../../../DataType/CartType";
import { MyService } from "../../Service/my-services.service";
import { ProductType } from "../../../DataType/ProductType";
import { Observable } from "rxjs";
import { processCheckOutType } from "../../../DataType/ProductType";

@Component({
    selector: 'itemcheckout2',
    templateUrl: './itemProductCheckOut2.component.html',
    styleUrl: './itemProductCheckOut2.component.scss'
}) export class itemProductCheckOut2Component {

    @Input() CartDetail!: CartType;
    @Output() UpdateQuatity = new EventEmitter<processCheckOutType>();

    constructor(private myService: MyService){
        
    }

    ngOnInit() {
        this.getProduct();
    }
    

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

    private getData(serviceCall: Observable<any>, callback?: (data: any) => void): void {
        serviceCall.subscribe(data => {
            if (callback) {
                callback(data);
            }
        }, error => {
            console.log(error);
        });
    }

    Update(id:number, re: number) {
        const body: processCheckOutType = {idProduct: id, respon: re};
        this.UpdateQuatity.emit(body);
    }

    getProduct() {
        this.getData(this.myService.getProductByID(this.CartDetail.PerfumeDetailID), data => {
            this.productInfo = data;
        });
    }
}