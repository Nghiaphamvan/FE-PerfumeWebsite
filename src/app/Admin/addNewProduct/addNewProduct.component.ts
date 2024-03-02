import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AuthService } from "../../Service/auth.Service";


@Component({
    selector: 'add-new-product',
    templateUrl: './addNewProduct.component.html',
    styleUrl: './addNewProduct.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class AddNewProduct implements OnInit{
    //constructor(public service: AuthService){}

    ngOnInit(): void {
        //this.service.refreshList();
    }
}