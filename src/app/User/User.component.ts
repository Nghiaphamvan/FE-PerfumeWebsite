import { Component } from "@angular/core";
import { UserType } from "../../DataType/UserType";

@Component({
    selector:'user',
    templateUrl:'./User.component.html',
    styleUrl:'./User.component.scss'
}) export class UserComponent {
    userInfo: UserType = {
        id: 1
    };
}