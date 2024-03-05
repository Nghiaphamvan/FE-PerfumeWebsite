import { Component } from "@angular/core";

import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'store-page',
    templateUrl: './storePage.component.html',
    styleUrl: './storePage.component.scss',
}) 
export class StorePageComponent{

    constructor(private _formBuilder: FormBuilder) {
        this.createTypeListGroup();
        this.createTradeMarkGroup();
    }

    favoriteSeason: string = '';
    categoryList: string[] = ["MEN's PERFUME", "WOMEN's PERFUME", "MINI PERFUME", "NICHE PERFUME", "MAKE UP", "BODY CARE", "GIFT SET"];
    typeList: string[] = ["giftset", "menperfume", "womenperfume", "unisexperfume", "unisex", "spraydeodorant"];
    trademarklist: string[] = ["arianagrande", "carolinaherrera", "chanel", "creed", "giorgioarmani", "gucci", "hugoboss"];

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