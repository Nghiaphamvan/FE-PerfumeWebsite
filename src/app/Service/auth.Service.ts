import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PerfumeDetail } from './perfumeDetailModel';

@Injectable({
    providedIn:'root'
})
export class AuthService{

    url:string = environment.apiBaseURL + '/Perfume/getAllPerfumes'
    list: PerfumeDetail[] = [];

    constructor(private http: HttpClient){}

    
    refreshList(){
        this.http.get('url')
        .subscribe({
            next: res => {
                this.list = res as PerfumeDetail[]
            },
            error: err => {
                console.log(err)
            }
        })
    }
}

