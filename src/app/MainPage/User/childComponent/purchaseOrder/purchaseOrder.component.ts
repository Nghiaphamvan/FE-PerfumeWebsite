import { Component } from "@angular/core";

@Component({
    selector:'purchase-order',
    templateUrl: './purchaseOrder.component.html',
    styleUrl:'./purchaseOrder.component.scss'
}) export class PurchaseOrderComponent {
    navNarArr: boolean[] = [true, false, false, false, false, false];
    activeclick(v:number) {
        this.navNarArr.fill(false);
        this.navNarArr[v] = true;
    }
}