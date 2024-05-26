import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../../Service/share-data-component.service";

@Component({
    selector: 'headline-info',
    templateUrl: './HeadLineInfo.html',
})

export class HeadLineInfo{
    constructor(private route: Router, private dataService: DataService){}
    ngOnInit() {
        console.log('asdasd', this.unserInfo);
    }

    @Input() unserInfo: any;
    redirectToUser() {
        this.route.navigate(['/user']);
    }
}