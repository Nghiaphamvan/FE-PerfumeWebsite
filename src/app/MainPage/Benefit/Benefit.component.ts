import { Component } from "@angular/core";

@Component({
    selector: 'benefit',
    templateUrl: './Benefit.component.html',
    styleUrl: './Benefit.component.scss'
}) export class BenefitComponent {
    benefits = [
        {
            policySource: 'assets/Images/Logo/policy_1.jpg',
            policyContent: 'Free shipping for pre-transfer  orders',
            content: 'Same day delivery for inner city orders'
        },
        {
            policySource: 'assets/Images/Logo/policy_2.jpg',
            policyContent: 'Free gift box',
            content: 'For all orders'
        },
        {
            policySource: 'assets/Images/Logo/policy_3.jpg',
            policyContent: "Dare to stamp to guarantee the shop's goods",
            content: 'Return policy within 14 days'
        },
        {
            policySource: 'assets/Images/Logo/policy_4.jpg',
            policyContent: "Hotlive: 0363106151",
            content: 'Fast direct support '
        }
      ]
}