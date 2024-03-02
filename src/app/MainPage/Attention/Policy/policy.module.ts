import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PolicyComponent } from "./Policy.component";

@NgModule({
    declarations: [
        PolicyComponent
    ],
    imports: [
        CommonModule,
    ],
    exports:[
        PolicyComponent
    ]
})

export class PolicylModule {}