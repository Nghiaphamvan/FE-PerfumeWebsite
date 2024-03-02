import { Component, Input, OnInit } from "@angular/core";

export interface Policy{
    policyName: string,
    policyNote: string,
    policyIcon: string
}

@Component({
    selector: 'policy-component',
    templateUrl: './policy.html'
})

export class PolicyComponent implements OnInit{
    ngOnInit(): void {
        
    }
    @Input() PolicyList: Policy[]=[]

}