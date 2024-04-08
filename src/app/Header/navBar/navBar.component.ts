import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'navbar',
    templateUrl: './navBar.html',
    styleUrl: './navBar.component.scss'
})

export class navBar {
    constructor(private route: Router){}
    redirectToBrand() {
        this.route.navigate(['/brand']);
    }
    LogoPath = 'assets\\Images\\Logo\\Logo.png';
    iconSearch: string = 'search';
    activeBtnSearch() {
        if(this.iconSearch == 'search') this.iconSearch = 'keyboard_arrow_down';
        else this.iconSearch = 'search';
    }
}