import { Component, Output, EventEmitter } from "@angular/core";
import { ProductType } from "../../../DataType/ProductType";

@Component({
    selector: 'item-product-checkout',
    templateUrl: './itemProductCheckOut.component.html',
    styleUrl: './itemProductCheckOut.component.scss'
}) export class ItemProductCheckOutComponent {
    @Output() getPrice = new EventEmitter<number>();
    checked: boolean = false;
    value: number = 0;

    passPrice(value: number) {
        this.getPrice.emit(value);
        console.log('Data from child: ' + value);
    }

    activeClick() {
        this.checked = !this.checked;
        this.passPrice(this.checked ? this.value : 0);
    }
}