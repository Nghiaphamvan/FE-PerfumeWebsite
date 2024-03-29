import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MyService } from "../../HttpRequest/my-services.service";
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
    // constructor(private myService: MyService) { }

    // newProduct : Product = {
    //   name: "test",
    //   price: 0,
    //   brand: "test",
    //   description: "test",
    //   notes: "test",
    //   url: "test"
    // } 

    // ngOnInit() {
    //     this.myService.fetchData().subscribe(
    //       data => {
    //         console.log("success");
    //         // Xử lý kết quả trả về
    //         console.log(data);
    //       },
    //       error => {
    //         // Xử lý lỗi nếu có
    //         console.error(error);
    //       }
    //     );

    //     this.myService.getSomeData(5).subscribe(data => {
    //         console.log("success");
    //         // Xử lý kết quả trả về
    //         console.log(data);
    //       }, error => {
    //         console.error(error);
    //     });

    //     this.myService.addNewProduct(this.newProduct).subscribe(data => {
    //       console.log("Success");
    //       console.log(data);
    //       }, error => {
    //       console.log(error)
    //     });
    // }
}