import { Component, OnInit } from '@angular/core';
import { CommomUserService } from '../../services/commom-user.service';

@Component({
  selector: 'app-order-tracker',
  templateUrl: './order-tracker.component.html',
  styleUrls: ['./order-tracker.component.scss']
})
export class OrderTrackerComponent implements OnInit{
  orderId:any;
  orderStatus:any;
constructor(private shared : CommomUserService){}
ngOnInit(): void {
  
  this.onInit();
}

onInit(){
this.orderId = localStorage.getItem('OrderId')
this.orderStatus = localStorage.getItem('OrderStatus')
this.updateStatus();
}

updateStatus(){
  let status = document.getElementById('placed')
  console.log(status)
  if(this.orderStatus == 'Placed'){
   status?.classList.add('step-complete')
  }
}

}
