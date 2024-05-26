// data.service.ts
import { Injectable } from '@angular/core';
import { ProductType } from '../../DataType/ProductType';
import { Observable, Subject } from 'rxjs';
import { UserType } from '../../DataType/UserType';
import { CartType } from '../../DataType/CartType';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private brandNameFromBrandPage: string ='';
  private SearchText: string = '';
  public Carts!: CartType[];
  
  private responseToken : boolean = false;

  private userInfo: UserType = {
    email: "",
    firstName: "",
    lastName: ""
  };

  private searchSubject = new Subject<void>();

  private getEmailSubject = new Subject<any>();

  SearchCallFunction =  this.searchSubject.asObservable();

  onGetEmailSubject(): Observable<any> {
    return this.getEmailSubject.asObservable();
  }

  setResponseToken(value : boolean) {
    this.responseToken = value;
  }

  getResponseToken() {
    return this.responseToken;
  }

  setProductAddedToCart(carts: CartType[]) {
    this.Carts = carts;
  }

  getProductAddedToCart() {
    return  this.Carts;
  }

  executeSearch() {
    this.searchSubject.next();
  }

  setPerfumeBrandFromBrandPage(data: string) {
    this.brandNameFromBrandPage = data;
  }

  getPerfumeBrandFromBrandPage() {
    return this.brandNameFromBrandPage;
  }

  setSearchText(data: string) {
    this.SearchText = data;
  }

  getSearchText() {
    return this.SearchText;
  }

  public SearchProcessing(Products: ProductType[], searchText: string): any {
    if(searchText.trim()) {
        Products = Products.filter(product => product.name.toLowerCase().includes(searchText.trim().toLocaleLowerCase()));
    }
    return Products;
  }

  setUserInfo(userInfo: UserType) {
    this.userInfo = userInfo;
    this.getEmailSubject.next(this.userInfo);
  }

  getUserInfo() {
    return this.userInfo;
  }
}
