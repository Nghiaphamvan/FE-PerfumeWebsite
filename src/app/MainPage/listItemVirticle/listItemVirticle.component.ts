import { Component, Input, ViewEncapsulation } from '@angular/core';
import SwiperCore, {Navigation, Pagination, EffectCoverflow } from 'swiper';

SwiperCore.use([Navigation, Pagination, EffectCoverflow]);

interface carouselImage {
  imageSrc: string
}

@Component({
  selector: 'list-Item-Virticle',
  templateUrl: './listItemVirticle.html',
  styleUrl: './listItemVirticle.scss',
  encapsulation: ViewEncapsulation.None,
})

export class listItemVirticle {
  title = 'carousel';
  @Input() Images: carouselImage[]=[];
  @Input() Text = '';

  hoveredIndex: number | null = null;

  divOpacity: number = 1;
  divDisplay: string = "none";
  selectedIndex = 0;

  onMouseEnter(index:number){
    this.hoveredIndex = index;
  }

  onMouseLeave(index:number){
    if (this.hoveredIndex === index) {
      this.hoveredIndex = null;
    }
  }
}
