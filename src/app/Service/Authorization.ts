import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DataService } from './share-data-component.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtDecode } from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthService implements HttpInterceptor {

    constructor(private http: HttpClient, private dataservice: DataService) { }
    
    private localStorageSubject = new Subject<any>();


    saveToken(token: string) {
        localStorage.setItem('token', token);
        this.localStorageSubject.next({ "token": token });
    }

    getToken() {
        return localStorage.getItem('token');
    }

    getPayLoad() {
        return this.getDecodedAccessToken(localStorage.getItem('token')!);
    }

    getDecodedAccessToken(token: string): any {
        try{
            const decodedToken = jwtDecode(token);
            return decodedToken;
        } catch(Error) {
          return null;
        }
      }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        
        return next.handle(request);
    }
    
    onLocalStorageChange(): Observable<any> {
        return this.localStorageSubject.asObservable();
    }

    logout() {
        localStorage.removeItem('token');
    }
}
