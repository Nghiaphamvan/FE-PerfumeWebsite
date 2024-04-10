// data.service.ts
import { Injectable } from '@angular/core';
import { ProductType } from '../../DataType/ProductType';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private brandNameFromBrandPage: string ='';
  private SearchText: string = '';

  private searchSubject = new Subject<void>();

  SearchCallFunction =  this.searchSubject.asObservable();

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
}
