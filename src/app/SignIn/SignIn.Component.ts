import { Component,EventEmitter, Output } from "@angular/core";
import { Observable, Subject, debounceTime } from "rxjs";
import { checkMethod } from "../Service/check.service";
import { MyService } from "../Service/my-services.service";
import { response } from "express";

@Component({
    selector: 'signin',
    templateUrl:'./SignIn.Component.html',
    styleUrl: './SignIn.Component.scss'
}) export class SignInComponent {
    constructor(private checkmethod: checkMethod, private myService: MyService){}

    password:string = "";
    debouncer: Subject<string> = new Subject<string>();
    checkValidPassword: string = "check_small";

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