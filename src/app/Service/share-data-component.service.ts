// data.service.ts
import { Injectable } from '@angular/core';
import { ProductType } from '../../DataType/ProductType';
import { Subject } from 'rxjs';
import { UserType } from '../../DataType/UserType';
import { CartType } from '../../DataType/CartType';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private brandNameFromBrandPage: string ='';
  private SearchText: string = '';
  public Carts!: CartType[];
  private userInfo: UserType = {
    id: 1
  };

  private searchSubject = new Subject<void>();


  SearchCallFunction =  this.searchSubject.asObservable();

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
  }

  getUserInfo() {
    return this.userInfo;
  }
}
