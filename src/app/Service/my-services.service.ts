// my-service.service.ts hoặc my-component.component.ts
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'node:console';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CartType } from '../../DataType/CartType';

export class Product {
  name: string ="";
  price: number = 0;
  brand: string = "";
  description: string = "";
  notes: string = "";
  url: string = "";
}


@Injectable({
  providedIn: 'root'
})
export class MyService {
  constructor(private http: HttpClient) { }

  readonly apiUrl = 'https://localhost:7164/api/Product/'; // URL của API

  getData(serviceCall: Observable<any>, callback?: (data: any) => void): void {
    serviceCall.subscribe(data => {
        if (callback) {
            callback(data);
        }
    }, error => {
        console.log(error);
    });
  }

  getProductSale() {
    return this.http.get<any>(this.apiUrl + 'GetProductSale');
  }

  getPercentSaleByID(id: number) {
    const productIdString: string = id.toString();
    return this.http.get<any>(this.apiUrl + `GetPercentSaleByID?id=${productIdString}`);
  }

  getProductByCategory(name: string){ 
    const encodedInput: string = encodeURIComponent(name);
    // https://localhost:7164/api/Product/GetProductByCategory?name=NICHE%20PERFUME'  
    return this.http.get<any>(this.apiUrl + `GetProductByCategory?name=${encodedInput}`);
  }

  GetAllData() {
    return this.http.get<any>(this.apiUrl + 'getAllPerfumes');
  }

  getSomeData(productId: number): Observable<any> {
    // Chuyển đổi tham số productId thành một chuỗi
    const productIdString: string = productId.toString();

    // Truyền tham số productId trong URL của yêu cầu GET
    return this.http.get<any>(this.apiUrl + `GetSomeProduct?n=${productIdString}`);
  }

  getAllBrands(){
    return this.http.get<any>(this.apiUrl + 'GetAllBrands');
  } 

  getAllCategories(){
    return this.http.get<any>(this.apiUrl + 'GetAllCategories');
  }

  addNewProduct(newProduct: Product){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<any>(this.apiUrl + 'addNewPerfume', newProduct, { headers: headers });
  }

  addProductToCartMethod(CustomerID: number, ProductID: number): Observable<any> {
    const body = { customerId: CustomerID, productId: ProductID };
    return this.http.post<any>(this.apiUrl + 'AddProductToCart', body);
  }
  

  AddProductToCart(CustomerId : number,  ProductId: number) {
    this.addProductToCartMethod(CustomerId, ProductId).subscribe(
      (response) => {
          console.log('Success:', response);
      },
      (error) => {
          console.error('Error:', error);
      }
  );
  }

  UpdateCart(ProductID: number, Response: string) {
    const body = { productId: ProductID, response: Response };
    const Pro = ProductID.toString();
    const Re = Response.toString();
    return this.http.put<any>(`${this.apiUrl}UpdateCart?id=${Pro}&response=${Re}`, body).subscribe(
      (re) => {
        console.log('succeess', re);
      },
      (er) => {
        console.log('er', er);
      }
    );
  }

  UpdateCartAmount(ProductID: number, Amount: number) {
    const body = {id: ProductID, amount: Amount};
    const Pro = ProductID.toString();
    const a = Amount.toString();
    return this.http.put<any>(`${this.apiUrl}UpdateCart?id=${Pro}&response=${a}`, body).subscribe(
      (re) => {
        console.log('succeess', re);
      },
      (er) => {
        console.log('er', er);
      }
    );
  }


  DeleteCart(CartID: number) {
    // https://localhost:7164/api/Product/DeleteCart?id=1060
    const Ca = CartID.toString();
    return this.http.delete<any>(this.apiUrl + `DeleteCart?id=${Ca}`).subscribe(
      (re)=> {
        console.log(re);
      }, (er) => {
        console.log(er);
      }
    );
  }

  GetAllCartsByCustomerID(CustomerId: number) {
    const id : string = CustomerId.toString();
    return this.http.get<any>(this.apiUrl + `GetCartsByCustomerID?customerID=${id}`);
  }

  getProductByID(ProductID:number) {
    const id:string = ProductID.toString();
    return this.http.get<any>(this.apiUrl + `getPerfumeby${id}`);
  }

  SignUp(FirstName: string, LastName: string, Email: string, Password: string, ConfirmPassword: string): Observable<any> {
    const body = { FirstName: FirstName, LastName: LastName,  Email: Email, Password: Password, ConfirmPassword: ConfirmPassword};
    return this.http.post<any>('https://localhost:7164/api/Account/SignUp', body);
  }

  checkMail(email: string) {
      return this.http.get<any>(`https://localhost:7164/api/Account/checkEmail?email=${email}`);
  }
}
