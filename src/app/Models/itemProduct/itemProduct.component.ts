import { Component, Input } from "@angular/core";
import { PerfumeType } from "../../Service/perfumeDetailModel";
import number from "stream";

export interface ProductType {
    id: number;
    name: string;
    pice: number;
    url: string;
    volume: number;
    description: string;
    brand: string;
    notes: string;
}

@Component({
    selector: 'item-product',
    templateUrl: './itemProduct.component.html',
    styleUrl: './itemProduct.component.scss'
})
export class ItemProductComponent{
    @Input() Product!: ProductType;
}