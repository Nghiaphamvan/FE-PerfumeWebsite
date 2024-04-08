import { Component } from "@angular/core";

@Component({
    selector: 'footer',
    templateUrl: './Footer.component.html',
    styleUrl: './Footer.component.scss'
}) export class FooterComponent {
    Brands = [
        {
            src: 'assets/Images/Brand/brand1.jpg'
        },
        {
            src: 'assets/Images/Brand/brand2.jpg'
        },
        {
            src: 'assets/Images/Brand/brand3.jpg'
        },
        {
            src: 'assets/Images/Brand/brand4.jpg'
        },
        {
            src: 'assets/Images/Brand/brand5.jpg'
        },
    ]
}