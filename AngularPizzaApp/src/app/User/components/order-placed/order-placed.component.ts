import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.scss']
})
export class OrderPlacedComponent implements OnInit {
  orderPlacedImg:any;
  orderPlacedImg2:any;
constructor(private router:Router){
  
}

ngOnInit(): void {
  this.orderPlacedImg = '../../../../assets/Images/orderCnf2.gif';
  setTimeout(()=>{
    this.getImg();
  },4000)
}
getImg(){
  this.orderPlacedImg = '../../../../assets/Images/orderPlaced.gif';
}

ViewOrders(){
 this.router.navigateByUrl('/User/my-orders')
}


}
