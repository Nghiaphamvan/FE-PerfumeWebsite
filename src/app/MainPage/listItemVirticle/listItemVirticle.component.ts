import { Component, Input, ViewEncapsulation } from '@angular/core';
import SwiperCore, {Navigation, Pagination, EffectCoverflow } from 'swiper';
import { MyService } from "../../Service/my-services.service";
import { error } from "console";

SwiperCore.use([Navigation, Pagination, EffectCoverflow]);

@Component({
  selector: 'list-Item-Virticle',
  templateUrl: './listItemVirticle.html',
  styleUrl: './listItemVirticle.scss',
  encapsulation: ViewEncapsulation.None,
})

export class listItemVirticle {

  constructor(private myService : MyService){}

  title = 'carousel';
  @Input() Text = '';
  @Input() amountProduct = 0;
  @Input() nameCampaign = '';
  @Input() typeProduct = '';
  myArray: any[] = [];

  ngOnInit(){
    this.myService.getSomeData(this.amountProduct).subscribe(data => {
      console.log("success");
      this.myArray = data;
      console.log(this.myArray);
    }, error => {
      console.log(error);
    })
  }
  
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
