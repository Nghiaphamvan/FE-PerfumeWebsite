import { Component } from "@angular/core";
@Component({
    selector: 'store-page',
    templateUrl: './storePage.component.html',
    styleUrl: './storePage.component.scss',
}) 
export class StorePageComponent{
    favoriteSeason: string = '';
    maxValue = 10000000;
    minValue = 0;
    seasons: string[] = ["MEN's PERFUME", "WOMEN's PERFUME", "MINI PERFUME", "NICHE PERFUME", "MAKE UP", "BODY CARE", "GIFT SET"];
}