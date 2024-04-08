import { Component, Input, OnInit } from "@angular/core";

import {FormBuilder, FormGroup} from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { MyService  } from "../Service/my-services.service";
import { ProductType } from "../../DataType/ProductType";
import { error } from "console";
import { Observable } from "rxjs";
@Component({
    selector: 'store-page',
    templateUrl: './storePage.component.html',
    styleUrl: './storePage.component.scss',
}) 
export class StorePageComponent implements OnInit{

    typePage: string = "";
    @Input() amountProduct = 40;
    p: number = 1;
    isbool: boolean = false;

    Products: any[] = [];
    Brands: string[] = [];
    Categories: any[] = [];
    
    filterdProducts: ProductType[] = [];
    backUpProducts: ProductType[] = [];

    thisComponetCategory: string = '';
    checkedCategories: string = '';
    CurrentVolume: number = -1;

    Brandslist:string [] = []; 
    toppings: FormGroup[] = [];
    checkedBrands: string[] = [];

    valueSearch = '';
    typeSearch = '';
    trademarkSearch = '';
    
    startValue: number = 0;
    endValue: number = 3000;

    typeListGroup!: FormGroup;
    BrandslistGroup!: FormGroup;

    constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute, private myService: MyService) {
        this.getBrands();
        this.getCategories();
    }

    async ngOnInit(){
        this.route.params.subscribe(params => {
            this.typePage = params['productType'];
            this.preprocessingDatabyTypePage(this.typePage);
        });
    }

    private preprocessingDatabyTypePage(type: string) {
        switch(type) {
            case 'giftset':
            case 'bodycare':
            case 'sale':
                this.thisComponetCategory = type;
                this.getProductByCategory(type);
                
                break;
            case 'perfume':
                this.thisComponetCategory = 'perfume';
                this.getAllDatas();
                break;
        }
    }

    protected ProcessingProducts() {
        this.Products = this.backUpProducts;
        
        // Lọc theo giá sản phẩm
        this.Products = this.Products.filter(product => product.price > this.startValue && product.price < this.endValue);
    
        // Lọc theo dung tích sản phẩm nếu có
        if (this.CurrentVolume !== -1) {
            this.Products = this.Products.filter(product => product.volume === this.CurrentVolume);
            console.log('process volume');
        }
    
        // Lọc theo thương hiệu sản phẩm nếu có
        if (this.checkedBrands.length !== 0) {
            this.Products = this.Products.filter(product => this.checkedBrands.includes(product.brand));
            console.log('process brand');
        }
    }

    protected filtProductByPrice() {
        console.log('Filt by Price');
        this.ProcessingProducts();
    }
    

    protected getCheckedBrands(value: string) {
        const index = this.checkedBrands.indexOf(value);
        if (index !== -1) {
            this.checkedBrands.splice(index, 1); 
        } else {
            this.checkedBrands.push(value); 
        }
        this.ProcessingProducts();
    }
    

    selectSize(volume: number) {
        this.CurrentVolume = volume;
        this.ProcessingProducts();
    }

    protected getProductByCategory(value: string) {
        this.thisComponetCategory = value;
        this.getProductByCategories(this.thisComponetCategory);
    }

    protected updateStartValue() {
        this.startValue = parseInt(this.startValue.toString()); 
    }

    protected updateEndValue() {
        this.endValue = parseInt(this.endValue.toString());
    }

    private getProductByCategories(name: string):void {
        this.myService.getProductByCategory(name).subscribe(data => {
            this.Products = data;
            this.backUpProducts = this.Products;
            this.ProcessingProducts();
        });
        
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

    private getCategories(): void {
        this.getData(this.myService.getAllCategories(), categories => {
            this.Categories = categories;
        });
    }

    private getAllDatas() {
        this.getData(this.myService.GetAllData(), data => {
            this.Products = data;
            this.backUpProducts = this.Products;
            console.log('get All  Data', this.Products);
        })
    }

    private getBrands():void {
        this.getData(this.myService.getAllBrands(), brands => {
            this.Brands = brands;
            this.Brandslist.push(...brands);
        });
    }

    protected isSelected(controlName: string): boolean {
        return this.checkedBrands.includes(controlName);
    }
    
}