import { Component, ViewEncapsulation } from "@angular/core";
import { UserType } from "../../../DataType/UserType";
import { Router } from "@angular/router";

@Component({
    selector:'user',
    templateUrl:'./User.component.html',
    styleUrl:'./User.component.scss',
    encapsulation: ViewEncapsulation.None
}) export class UserComponent {
    userInfo: UserType = {  
        id: 1
    };

    constructor(private route: Router) {}

    backToMyProfile() {
        this.route.navigate(['/user']);
    }

    myAccountArr: boolean[] = [true, false, false];
    navleft: boolean[] = [true, false, false]

    myAccountClicked: boolean = true;

    myAccountActive(v:number) {
        this.myAccountArr.fill(false);
        this.myAccountArr[v] = true;
    }

    activenavLeft(v: number) {
        this.navleft.fill(false);
        this.navleft[v] = true;
        v == 0 ? this.myAccountClicked = true : this.myAccountClicked= false;
    }
}