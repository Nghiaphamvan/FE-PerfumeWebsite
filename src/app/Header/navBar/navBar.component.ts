import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../../Service/share-data-component.service";
@Component({
    selector: 'navbar',
    templateUrl: './navBar.html',
    styleUrl: './navBar.component.scss'
})

export class navBar {
    constructor(private route: Router, private dataService: DataService){}

    searchText: string = '';

    redirectToBrand() {
        this.route.navigate(['/brand']);
    }

    redirectToCart() {
        this.route.navigate(['/cart']);
    }

    LogoPath = 'assets\\Images\\Logo\\Logo.png';
    iconSearch: string = 'search';

    activeBtnSearch() {
        if(this.iconSearch == 'search') this.iconSearch = 'keyboard_arrow_down';
        else this.iconSearch = 'search';
    }

    search () {
        if(this.iconSearch == 'search') this.iconSearch = 'keyboard_arrow_down';
        else this.iconSearch = 'search';
        this.route.navigate(['/store/search']);
        if(this.route.url === '/store/search') {
            this.dataService.setSearchText(this.searchText);
            this.dataService.executeSearch();
        }
    }
}