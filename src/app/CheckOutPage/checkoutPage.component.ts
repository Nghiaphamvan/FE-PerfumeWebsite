import { Component } from "@angular/core";

@Component({
    selector: 'checkout-page',
    templateUrl:'./checkoutPage.component.html',
    styleUrl: './checkoutPage.component.scss'
}) export class CheckoutPageComponent {
    SubtotalValue : number = 0;
    Shipping: number = -1;
    Total: number = 0;
    Checkout: number = 0;

    temp: number = 0;

    handleAddToCart(eventData: number) {
        this.temp = eventData;
        console.log('Data from parent: ' + this.temp);
    }
      
}