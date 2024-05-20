import { Component,EventEmitter, Output, inject } from "@angular/core";
import { Observable, Subject, debounceTime } from "rxjs";
import { checkMethod } from "../../Service/check.service";
import { MyService } from "../../Service/my-services.service";
import { response } from "express";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../Service/Authorization";
import { DataService } from "../../Service/share-data-component.service";

@Component({
    selector: 'signin',
    templateUrl:'./SignIn.Component.html',
    styleUrl: './SignIn.Component.scss'
}) export class SignInComponent {
    constructor(private checkmethod: checkMethod, private myService: MyService, private auth: AuthService, private dataservice: DataService){}

    password:string = "";
    debouncer: Subject<string> = new Subject<string>();
    checkValidPassword: string = "check_small";
    validSignIn: boolean = false;
    email:string ="";
    statusCodeResponse: number = 0;

    @Output() goToSignUp: EventEmitter<number> = new EventEmitter<number>();
    
    ngOnInit() {
        this.debouncer.pipe(
            debounceTime(1000) // 1s
        ).subscribe((value) => {
            this.passwordValid();
        })
    }
   
    directComponent(value: number){
        this.goToSignUp.emit(value);
    }

    onInputChange(value: string) {
        this.debouncer.next(value);
    }

    onInput(value: string) {
        this.debouncer.next(value);
    }

    getData(serviceCall: Observable<any>, callback?: (data: any) => void): void {
        serviceCall.subscribe(data => {
            if (callback) {
                callback(data);
            }
        }, error => {
            console.log('error', error);
        });
    }

    SignIn(Email: string, Password: string) {
        this.myService.SignIn(Email, Password).subscribe(
          (response) => {
            this.statusCodeResponse = response.StatusCode;
            this.auth.saveToken(response.Value);
            this.dataservice.setResponseToken(true);
          },
          (error) => {
            console.error('Lỗi trong quá trình thực hiện SignUp:', error);
          }
        );
        
    }

    activeSignIn(){
        if(this.email.trim()!=='' && this.passwordValid()){
            this.SignIn(this.email, this.password);
        }
    }

    passwordValid() {
        if(!this.checkmethod.checkCorrectPassword(this.password)){
            this.checkValidPassword = "close";
            return false;
        } else {
            this.checkValidPassword = "check_small";
            return true;
        }
    }
}