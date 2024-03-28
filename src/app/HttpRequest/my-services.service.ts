// my-service.service.ts hoặc my-component.component.ts
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  GetAllData() {
    return this.http.get<any>(this.apiUrl + 'getAllPerfumes');
  }

  getSomeData(productId: number): Observable<any> {
    // Chuyển đổi tham số productId thành một chuỗi
    const productIdString: string = productId.toString();

    // Truyền tham số productId trong URL của yêu cầu GET
    return this.http.get<any>(this.apiUrl + `GetSomeProduct?n=${productIdString}`);
  }

  addNewProduct(newProduct: Product){
    // Thiết lập header của yêu cầu
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    // Thực hiện HTTP POST request để thêm sản phẩm mới
    return this.http.post<any>(this.apiUrl + 'addNewPerfume', newProduct, { headers: headers });
  }
}
