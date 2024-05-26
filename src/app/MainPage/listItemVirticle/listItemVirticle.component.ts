import { Component, Input, Output, ViewEncapsulation } from '@angular/core';
import SwiperCore, {Navigation, Pagination, EffectCoverflow } from 'swiper';
import { MyService } from "../../Service/my-services.service";
import { error } from "console";
import { Subject } from 'rxjs';
import { fullScreenService } from '../../Service/fullscreenServices';
import { DataService } from '../../Service/share-data-component.service';

SwiperCore.use([Navigation, Pagination, EffectCoverflow]);

@Component({
  selector: 'list-Item-Virticle',
  templateUrl: './listItemVirticle.html',
  styleUrl: './listItemVirticle.scss',
  encapsulation: ViewEncapsulation.None,
})

export class listItemVirticle {

  constructor(
    private myService : MyService,
    private fss: fullScreenService,
    private datashare: DataService
  ){}

  private detailproduct = new Subject<number>();
  @Output() variableChanged = this.detailproduct.asObservable();

  title = 'carousel';
  @Input() Text = '';
  @Input() amountProduct = 0;
  @Input() nameCampaign = '';
  @Input() typeProduct = '';
  @Input() idProduct = -1;
  myArray: any[] = [];

  hoveredIndex: number | null = null;

  divOpacity: number = 1;
  divDisplay: string = "none";
  selectedIndex = 0;

  iconNames: { [key: number]: string } = {};
  
  
  passIdProduct(v:number) {
    this.fss.openDetail(v);
  }

  ngOnInit(){
    this.myService.getSomeData(this.amountProduct).subscribe(data => {
      this.myArray = data;
    }, error => {
      console.log(error);
    })
  }
  
  AddToCartAtMainPage(v: number, image: any) {
    this.iconNames[v] = 'check_circle';
    setTimeout(()=>{
      this.iconNames[v] = 'shopping_bag';
    }, 2000);
    const user = this.datashare.getUserInfo();
    this.myService.AddProductToCart(user.email, image.id);
  }


  onMouseEnter(index:number){
    this.hoveredIndex = index;
  }

  onMouseLeave(index:number){
    if (this.hoveredIndex === index) {
      this.hoveredIndex = null;
    }
  }



  seeDetail(v:number) {
    console.log(v);
  }
}
