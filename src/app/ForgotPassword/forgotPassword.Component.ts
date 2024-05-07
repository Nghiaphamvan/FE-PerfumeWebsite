import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector:'forgot-passwod',
    templateUrl: './forgotPassword.Component.html',
    styleUrl: './forgotPassword.Component.scss'
}) export class ForgotPasswordComponent {
    
    @Output() Direct: EventEmitter<number> = new EventEmitter<number>();

    DirectComponent(value: number) {
        this.Direct.emit(value);
    }
}