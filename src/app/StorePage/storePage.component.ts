import { Component, Input, OnInit } from "@angular/core";

import {FormBuilder, FormGroup} from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { MyService  } from "../Service/my-services.service";
import { ProductType } from "../../DataType/ProductType";
import { error } from "console";
import { Observable } from "rxjs";
import { DataService } from "../Service/share-data-component.service";

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
    searchText:string = '';

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

    TypeFromProduct : number = 2;

    typeListGroup!: FormGroup;
    BrandslistGroup!: FormGroup;

    CurrentSortProduct: string = 'Default'
    valueSort: string = '';


    
    constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute, private myService: MyService, private dataService: DataService) {
        this.getBrands();
        this.getCategories();

        this.dataService.SearchCallFunction.subscribe(() => {
            this.getDataForSearch();
        })
    }

    async ngOnInit(){
        this.route.params.subscribe(params => {
            this.typePage = params['productType'];
            this.preprocessingDatabyTypePage(this.typePage);
        });

        this.route.paramMap.subscribe(params => {
            const perfumeId = params.get('perfumeId');
            console.log(perfumeId);
        })

        if(this.dataService.getPerfumeBrandFromBrandPage() != '') {
            this.checkedBrands.push(this.dataService.getPerfumeBrandFromBrandPage());
        }

        if(this.dataService.getSearchText() != '') {
            this.searchText = this.dataService.getSearchText();
        }
    }


    SortProduct(type: string, Products: ProductType[] ) {
        switch(type) {
            case'default':
                console.log('default');
                this.CurrentSortProduct = 'Default';
                Products = Products.sort((a,b) => b.id - a.id);
                break;
            case 'atoz':
                console.log('a->z');
                this.CurrentSortProduct = 'A to Z';
                Products = Products.sort((a,b) => a.name.localeCompare(b.name));
                break;
            case 'priceincrease':
                console.log('Price increase');
                this.CurrentSortProduct = 'Price ascending';
                Products = Products.sort((a,b) => a.price - b.price);
                break;
            case 'pricedecrease':
                this.CurrentSortProduct = 'Price descending';
                Products = Products.sort((a,b) => b.price - a.price);
                break;
        }
    }
      

    private preprocessingDatabyTypePage(type: string) {
        switch(type) {
            case 'giftset':
                this.getProductByCategory(type);
                break;
            case 'bodycare':
                this.getProductByCategory(type);
                break;
            case 'sale':
                this.getProductSale();
                break;
            case 'perfume':
                this.thisComponetCategory = 'perfume';
                this.getAllDatas();
                break;
            case 'search': 
                this.getDataForSearch();
                break;
        }
    }

    private getDataForSearch() {
        this.getData(this.myService.GetAllData(), data => {
            this.Products = data;
            this.backUpProducts = this.Products;
            this.searchText = this.dataService.getSearchText();
            this.Products = this.dataService.SearchProcessing(this.backUpProducts, this.searchText);
        })
    }
    
    protected ProcessingProducts() {
        this.Products = this.backUpProducts;
        if(this.startValue != 0 && this.endValue != 3000) {
            this.Products = this.Products.filter(product => product.price > this.startValue && product.price < this.endValue);
        } 

        if (this.CurrentVolume !== -1) {
            this.Products = this.Products.filter(product => product.volume === this.CurrentVolume);
        }

        if (this.checkedBrands.length !== 0) {
            this.Products = this.Products.filter(product => this.checkedBrands.includes(product.brand));
        }
    }

    protected filtProductByPrice() {
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

    protected changeTypeFormProduct(value: number) {
        this.TypeFromProduct = value;
        console.log(this.TypeFromProduct);
    }

    private getProductSale() {
        this.getData(this.myService.getProductSale(), data => {
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
            this.ProcessingProducts();
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