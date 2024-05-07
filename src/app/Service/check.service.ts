import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
}) export class checkMethod{
    checkCorrectPassword(value: string): any{
        if(value.length <6) return false;

        const upperCaseRegex = /[A-z]/;
        const lowerCaseRegex = /[a-z]/;
        const numberRegex = /[0-9]/;
        const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

        if(
            !upperCaseRegex.test(value) || !lowerCaseRegex.test(value)
            || !numberRegex.test(value) || !specialCharRegex.test(value)
        ) {
            return false;
        }

        return true;
        
    }

    checkComfirmPassword(password: string, confirmPassword: string) {
        return password === confirmPassword;
    }
}