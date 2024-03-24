import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

export interface Perfume {
    name: string;
    description: string;
    type: string;
    state: string;
    price: number;
    capacity: number;
    quantity: number;
    origin: string;
}
  

@Component({
    selector: 'add-new-product',
    templateUrl: './addNewProduct.component.html',
    styleUrl: './addNewProduct.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class AddNewProduct  {

    readonly APIURL = "https://localhost:7164/api/Product/";
    constructor(private http: HttpClient){}

    // newPerfume: Perfume = {
    //     name: 'Tên nước hoa',
    //     description: 'Mô tả về nước hoa',
    //     type: 'Loại nước hoa',
    //     state: 'Tình trạng',
    //     price: 100,
    //     capacity: 50,
    //     quantity: 1000,
    //     origin: 'Xuất xứ'
    //   };
      
    products:any=[];


    refreshProduct(){
        this.http.get(this.APIURL + 'getAllPerfumes').subscribe(data => {
            this.products = data;
        });
        console.log(this.products);
    }

    getSomeProducts () {
        const queryParams = { n: 5 };

        this.http.get(this.APIURL + 'getSomeProducts', {params: queryParams}).subscribe(data => {
            this.refreshProduct
        })

       
    }

    ngOnInit(){
        this.refreshProduct();
        // this.getSomeProducts();
    }


    // addPerfume(){
    //     this.http.post(this.APIURL + 'addNewPerfume', this.newPerfume).subscribe(data => {
    //         this.refreshProduct();
    //     })
    // }
}