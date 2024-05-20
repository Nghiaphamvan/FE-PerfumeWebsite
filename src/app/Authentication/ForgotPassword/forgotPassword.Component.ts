import { Component, EventEmitter, Output } from "@angular/core";
import { MyService } from "../../Service/my-services.service";
import { Observable } from "rxjs";

@Component({
    selector:'forgot-passwod',
    templateUrl: './forgotPassword.Component.html',
    styleUrl: './forgotPassword.Component.scss'
}) export class ForgotPasswordComponent {
    
    @Output() Direct: EventEmitter<number> = new EventEmitter<number>();

    constructor(private myService: MyService) {}

    Email: string  = '';
    validEmail: boolean = true;

    DirectComponent(value: number) {
        this.Direct.emit(value);
    }

    getData(serviceCall: Observable<any>, callback?: (data: any) => void): void {
        serviceCall.subscribe(data => {
            if (callback) {
                callback(data);
            }
        }, error => {
            console.log(error);
        });
    }

    emailValid() {
        if(this.Email.trim()!=='') {
            this.getData(this.myService.checkMail(this.Email), data => {
                if(!data) {
                    this.validEmail = true;
                    this.DirectComponent(1);
                } else {
                    this.validEmail = false;
                }
            });
        }
    }
}