import { Component, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { MyService } from './Service/my-services.service';
import { AuthService } from './Service/Authorization';
import { DataService } from './Service/share-data-component.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.scss',
})
export class AppComponent implements OnDestroy{
  localStorageSubscription: Subscription;
  payload: any;
  title = 'PerfumeWebsite';
  login: boolean = false;
  token: string = "";
  type: number = 1;
  idProduct = -1;
  decodeToken: any;

  infoUser: any;

  constructor(private myService: MyService, private auth: AuthService,
    private dataservice: DataService, private jwtHelper: JwtHelperService) {
    this.validtoken();
    this.localStorageSubscription = this.auth.onLocalStorageChange().subscribe(data => {
      this.token = data;
      this.login = true;
      this.decodeToken = this.auth.getPayLoad();
    });

    this.infoUser = this.myService.getDetailCustomerByEmail('vanhastenghia@gmail.com');
    console.log('info user', this.infoUser);
  }

  ngOnInit():void {}

  validtoken() {
    if (typeof localStorage !== 'undefined') {
      this.myService.validToken().subscribe(
        (response: HttpResponse<any>) => {
          this.dataservice.setResponseToken(true);
          this.login = true;
          if (this.login) {
            this.decodeToken = this.auth.getPayLoad();
          } 
        },
        error => {
          if (error.status === 401) {
            this.dataservice.setResponseToken(false);
            this.login = false;
          } else {
            console.error('Error:', error);
          }
        }
      );
  
    }
  }
  
  getDirect(value:number) {
    this.type = value;
  }

  getLogin(value: boolean) {
      this.login  = value;
  }

  ngOnDestroy(): void {
    this.localStorageSubscription.unsubscribe();
  }
}
