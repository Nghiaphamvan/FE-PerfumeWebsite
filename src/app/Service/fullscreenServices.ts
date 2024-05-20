import { HttpInterceptor } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class fullScreenService  {
    private detailProduct = new Subject<any>();
    
    openDetail(v: number) {
        this.detailProduct.next({"id": v});
    }

    onOpenDetail() : Observable<any> {
        return this.detailProduct.asObservable();
    }
}