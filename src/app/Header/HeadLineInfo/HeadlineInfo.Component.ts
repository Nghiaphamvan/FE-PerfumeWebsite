import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../../Service/share-data-component.service";

@Component({

    selector: 'headline-info',
    templateUrl: './HeadLineInfo.html',
})

export class HeadLineInfo{
    constructor(private route: Router, private dataService: DataService){}
    redirectToUser() {
        this.route.navigate(['/user']);
    }
}