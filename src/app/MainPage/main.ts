import { Component } from "@angular/core";

@Component({
    selector: 'app-Main-Page',
    templateUrl: './main.html',
    styleUrl: './main.scss',
})

export class MainPage{
    imagesArrivals = [
        {
          imageSrc: '../assets/Images/Products/1.png'
        },
        {
          imageSrc: '../assets/Images/Products/2.png'
        },
        {
          imageSrc: '../assets/Images/Products/3.png'
        },
        {
          imageSrc: '../assets/Images/Products/4.png'
        },
        {
          imageSrc: '../assets/Images/Products/5.png'
        },
        {
          imageSrc: '../assets/Images/Products/6.png'
        },
        {
          imageSrc: '../assets/Images/Products/7.png'
        }
      ]
    textArrivals = 'New Arrivals'

    textBestSellers = 'Best Sellers'
    imagesBestSellers = [
      {
        imageSrc: '../assets/Images/Products/1.png'
      },
      {
        imageSrc: '../assets/Images/Products/2.png'
      },
      {
        imageSrc: '../assets/Images/Products/3.png'
      },
      {
        imageSrc: '../assets/Images/Products/4.png'
      },
      {
        imageSrc: '../assets/Images/Products/5.png'
      },
      {
        imageSrc: '../assets/Images/Products/6.png'
      },
      {
        imageSrc: '../assets/Images/Products/7.png'
      }
    ]

    textMakeUp = 'Make Up'
}