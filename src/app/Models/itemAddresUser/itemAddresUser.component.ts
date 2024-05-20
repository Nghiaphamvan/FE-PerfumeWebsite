import { Component } from "@angular/core";

@Component({
    selector:'item-address-user',
    templateUrl:'./itemAddresUser.component.html',
    styleUrl: './itemAddresUser.component.scss'
}) export class itemAddresUserComponent {
    clickedEditAddress: boolean = false;

    Update() {
        this.clickedEditAddress = !this.clickedEditAddress;
    }
}