import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MyService } from "../../Service/my-services.service";
import { error } from "console";

export class Product {
    name: string ="";
    price: number = 0;
    brand: string = "";
    description: string = "";
    notes: string = "";
    url: string = "";
}
@Component({
    selector: 'add-new-product',
    templateUrl: './addNewProduct.component.html',
    styleUrl: './addNewProduct.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class AddNewProduct  {
    constructor(private myService: MyService) { }

    newProduct : Product = {
      name: "test",
      price: 0,
      brand: "test",
      description: "test",
      notes: "test",
      url: "test"
    } 

    ngOnInit() {

        this.myService.addNewProduct(this.newProduct).subscribe(data => {
          console.log("Success");
          console.log(data);
          }, error => {
          console.log(error)
        });
    }
}