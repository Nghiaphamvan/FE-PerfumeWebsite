// my-service.service.ts hoặc my-component.component.ts
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'node:console';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CartType } from '../../DataType/CartType';
import { response } from 'express';
import { stat } from 'node:fs';

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
    return this.http.get<any>(this.apiUrl + `GetProductByCategory?name=${encodedInput}`);
  }

  GetAllData() {
    return this.http.get<any>(this.apiUrl + 'getAllPerfumes');
  }

  getSomeData(productId: number): Observable<any> {
    const productIdString: string = productId.toString();
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

  addProductToCartMethod(email: string, ProductID: number): Observable<any> {
    const body = { email: email, productId: ProductID };
    return this.http.post<any>('https://localhost:7164/api/Product/AddProductToCart', body);
  }
  

  AddProductToCart(email : string,  ProductId: number) {
    this.addProductToCartMethod(email, ProductId).subscribe(
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
    const Ca = CartID.toString();
    return this.http.delete<any>(this.apiUrl + `DeleteCart?id=${Ca}`).subscribe(
      (re)=> {
        console.log(re);
      }, (er) => {
        console.log(er);
      }
    );
  }

  getProductByID(ProductID:number) {
    const id:string = ProductID.toString();
    return this.http.get<any>(this.apiUrl + `getPerfumeby${id}`);
  }

  SignUp(FirstName: string, LastName: string, Email: string, Password: string, ConfirmPassword: string): Observable<any> {
    const body = { FirstName: FirstName, LastName: LastName,  Email: Email, Password: Password, ConfirmPassword: ConfirmPassword};
    return this.http.post<any>('https://localhost:7164/api/Account/SignUp', body);
  }

  SignIn(Email: string, Password: string): Observable<any> {
    const body = {Email: Email, Password: Password};
    return this.http.post<any>('https://localhost:7164/api/Account/SignIn', body);
  }

  checkMail(email: string) {
    return this.http.get<any>(`https://localhost:7164/api/Account/checkEmail?email=${email}`);
  }

  validToken(): Observable<HttpResponse<any>> {
    return this.http.get<any>('https://localhost:7164/api/Product/ValidToken', { observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }

  getDetailCustomerByEmail(email : string) {
    return this.http.get<any>(`https://localhost:7164/api/Account/GetDetailCustomerByEmail?email=${email}`);
  }

  getAllCartsByEmail(email: string) {
    return this.http.get<any>(`https://localhost:7164/api/Product/getAllCartsByEmail?email=${email}`);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 401) {
      console.log('Unauthorized request (401)');
    } else {
      console.error('An error occurred:', error);
    }
    return throwError(error);
  }
}
