import { AfterViewInit, Component, Input } from "@angular/core";
import { fullScreenService } from "../../Service/fullscreenServices";
import { Subscription } from "rxjs";
import { MyService } from "../../Service/my-services.service";

@Component({
    selector:'full-screen',
    templateUrl:'fullScreen.component.html',
    styleUrl:'./fullScreen.component.scss'
}) export class fullScreenComponent {
    onPage: boolean =  false;
    detailproduct: Subscription;
    idProduct:number = -1;

    constructor(private dff:fullScreenService, private myservice: MyService) {
        // full screen
        this.detailproduct = this.dff.onOpenDetail().subscribe(data => {
            this.idProduct = data.id;

            console.log('from parent', this.idProduct);
            this.onPage = !this.onPage;
        })
         
    }

    onDetailProduct(event: MouseEvent) {
        event.stopPropagation();
    }

    onFullScreenClick() {
        this.onPage = !this.onPage;
        
    }
}