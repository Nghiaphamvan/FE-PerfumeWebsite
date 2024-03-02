import { Component, Input, OnInit } from "@angular/core";

interface carouselImage{
    imageSrc: string;
}

@Component({
    selector: 'carousel-component',
    templateUrl: './Carousel.html'
})

export class CarouselComponent implements OnInit{
    @Input() images: carouselImage[]=[]
    @Input() indicator = true
    selectedIndex = 0;
    ngOnInit(): void {
    }

    selectImage(index:number){
        this.selectedIndex = index;
    }
}