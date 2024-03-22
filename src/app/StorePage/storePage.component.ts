import { Component, OnInit } from "@angular/core";

import {FormBuilder, FormGroup} from '@angular/forms';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'store-page',
    templateUrl: './storePage.component.html',
    styleUrl: './storePage.component.scss',
}) 
export class StorePageComponent implements OnInit{

    typePage: string = "";

    constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute) {
        this.createTypeListGroup();
        this.createTradeMarkGroup();
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
          this.typePage = params['productType'];
        });
    }

    favoriteSeason: string = '';
    categoryList: string[] = ["MEN's PERFUME", "WOMEN's PERFUME", "MINI PERFUME", "NICHE PERFUME", "MAKE UP", "BODY CARE", "GIFT SET"];
    typeList: string[] = ["Gift Set", "Men Perfume", "Women Perfume", "Unisex Perfume", "Unisex", "Spray Deodorant"];
    trademarklist: string[] = ["Ariana Grande", "Carolina Herrera", "Chanel", "Creed", "Giorgio Armani", "Gucci", "Hugo Boss"];

    valueSearch = '';

    typeSearch = '';

    trademarkSearch = '';
    
    startValue: number = 0;
    endValue: number = 1000;

    typeListGroup!: FormGroup;
    trademarklistGroup!: FormGroup;


    updateStartValue() {
        this.startValue = parseInt(this.startValue.toString()); 
    }

    updateEndValue() {
        this.endValue = parseInt(this.endValue.toString());
    }

    private createTypeListGroup(): void {
        const formGroupConfig: { [key: string]: any } = {};

        this.typeList.forEach(type => {
            formGroupConfig[type] = false;
        });

        this.typeListGroup = this._formBuilder.group(formGroupConfig);
    }

    private createTradeMarkGroup(): void{
        const formGroupConfig: { [key: string]: any } = {};

        this.trademarklist.forEach(type => {
            formGroupConfig[type] = false;
        });

        this.trademarklistGroup = this._formBuilder.group(formGroupConfig);
    }
}