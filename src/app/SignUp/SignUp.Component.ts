import { Component, Output, EventEmitter, OnChanges, SimpleChanges } from "@angular/core";
import { Observable, Subject, debounceTime } from "rxjs";
import { checkMethod } from "../Service/check.service";
import { MyService } from "../Service/my-services.service";

@Component({
    selector:'sign-up',
    templateUrl:'./SignUp.Component.html',
    styleUrl:'./SignUp.Component.scss'
}) export class SignUpComponent {

    constructor(private checkmethod: checkMethod,  private myService: MyService){}
    

    checkValidPassword: string = "close";
    checkvalidConfirmPassword: string = "close";
    checkvalidEmail: string = "close";

    password: string = "";
    confirmPassword: string = "";

    private debouncer: Subject<string> = new Subject<string>();
    private deboucercf: Subject<string> = new Subject<string>();    
    private emaildeboucer: Subject<string> = new Subject<string>();

    @Output() goToSignIn: EventEmitter<number> = new EventEmitter<number>();

    FirstName: string = "";
    LastName: string = "";
    Email: string = "";

    validEmail: boolean = false;
    validPassword: boolean = false;
    validConfirmPassword: boolean = false;
    validBtnSignUp: boolean = false;

    ngOnInit() {
        this.debouncer.pipe(
          debounceTime(100) // 1s
        ).subscribe((value) => {
          this.passwordValid();
        });
        
        this.deboucercf.pipe(
            debounceTime(100) // 1s
        ).subscribe((value) => {
            this.confirmPasswordValid();
        })

        this.emaildeboucer.pipe(
            debounceTime(100)
        ).subscribe((value) => {
            this.emailValid();
        })

    }

      
    checkValidation() {
        this.validBtnSignUp = this.validEmail && this.validPassword && this.validConfirmPassword;
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

    SignUp(FirstName: string, LastName: string, Email: string, Password: string, ConfirmPassword: string) {
        this.myService.SignUp(FirstName, LastName, Email, Password, ConfirmPassword).subscribe(
          (response) => {
            console.log('Kết quả trả về từ SignUp:', response);
          },
          (error) => {
            console.error('Lỗi trong quá trình thực hiện SignUp:', error);
          }
        );
    }
      
    ActiveSignUp() {
        this.validBtnSignUp = true;
        console.log(this.FirstName, this.LastName, this.Email, this.password, this.confirmPassword);
        // this.SignUp(this.FirstName, this.LastName, this.Email, this.password, this.confirmPassword);
    }

    onInputChange(value: string) {
        this.debouncer.next(value);
    }

    onInputChangeCf(value:string) {
        this.deboucercf.next(value);
    }

    onInputEmail(value: string) {
        this.emaildeboucer.next(value);
    }

    emailValid() {
        if(this.Email.trim()!=='') {
            this.getData(this.myService.checkMail(this.Email), data => {
                if(data) {
                    this.checkvalidEmail = "check_small";
                    this.validEmail = true;
                } else {
                    this.checkvalidEmail = 'close';
                    this.validEmail = false;
                }
                this.checkValidation();
            });
        }
    }

    passwordValid() {
        if(!this.checkmethod.checkCorrectPassword(this.password)){
            this.checkValidPassword = "close";
            this.validPassword = false;
            this.checkValidation();
            return false;
        } else {
            this.checkValidPassword = "check_small";
            this.validPassword = true;
            this.checkValidation();
            return true;
        }
    }

    confirmPasswordValid() {
        if(!this.checkmethod.checkComfirmPassword(this.confirmPassword, this.password)) {
            this.checkvalidConfirmPassword = "close";
            this.validConfirmPassword = false;
            this.checkValidation();
            return false;
        } else {
            this.checkvalidConfirmPassword = "check_small";
            this.validConfirmPassword = true;
            this.checkValidation();
            return true;
        }
    }

    directSignIn(value:number){
        this.goToSignIn.emit(value);
    }
}