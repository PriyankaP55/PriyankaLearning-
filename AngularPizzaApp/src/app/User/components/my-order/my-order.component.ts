import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommomUserService } from '../../services/commom-user.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit {
  userId:number=0;
  OrderDetails:any;
  @Output() orderData = new EventEmitter<string>();
constructor(private shared:CommomUserService,private router:Router){}

ngOnInit(): void {
  this.userId = Number(localStorage.getItem('UserId'));
  this.getAllCartItems();
}


  getAllCartItems()
  {
    this.shared.GetAllOrders( this.userId ).subscribe((res:any)=>{
     if(res.data.length >0){
    
     this.OrderDetails = res.data;
     this.orderData.emit(this.OrderDetails);
     }else{
      
     }
      //this.docName = res[0]['DocName'];
    })
  } 

  GoToTractOrder(data:any){
    localStorage.setItem('OrderId',data.OrderId)
    localStorage.setItem('OrderStatus',data.OrderStatus)
    this.router.navigateByUrl('/User/order-tracker')
  }

  addOrderData(value: string) {
   // this.orderData.emit(value);
  }

}



