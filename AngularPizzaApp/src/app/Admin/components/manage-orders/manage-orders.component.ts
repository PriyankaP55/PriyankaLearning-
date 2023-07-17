import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonServiceAdminService } from '../../services/common-service-admin.service';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent {
  AdminForm:FormGroup
  data:string='Test user';
  OrderDetails:any=[];
  StatusList:any=[];
 constructor(private shared:CommonServiceAdminService,private fb:FormBuilder){
  this.AdminForm = this.fb.group({
   orderStatusList: [''] 
  }) 
 }
 
 
 ngOnInit(): void {
   console.log('ngOnInit worked')
 this.getAllOrders();
 this.getOrdersStatus();
 }
 
 onInit(){
   this.StatusList=[
     {statusId:1,Name:'Order Placed'},
     {statusId:2,Name:'Confirmed'},
     {statusId:3,Name:'Prepared'},
     {statusId:4,Name:'Delivered'},
     {statusId:5,Name:'Completed'},
   ]
 }
 
 
 getAllOrders()
 {
   this.shared.GetAllUsersOrders().subscribe((res:any)=>{
    if(res.data.length >0){
   
    this.OrderDetails = res.data;
    this.AdminForm.controls['orderStatusList'].setValue(res.OrderStatus);
    }else{
     
    }
     //this.docName = res[0]['DocName'];
   })
 } 
 getOrdersStatus()
 {
   this.shared.GetOrderStatus().subscribe((res:any)=>{
    if(res.data.length >0){
    this.StatusList = res.data;
    }else{  
    }
   })
 } 
 
 UpdateOrderStatus(uId:any,docId:any){
   
    let obj:any={}
    obj.UserId = uId;
    obj.DocId = docId;
   // obj.StatusId = options.StatusId;
    obj.StatusName = this.AdminForm.controls['orderStatusList']?.value;
    this.shared.UpdateOrderStatus(obj).subscribe((res:any)=>{
     if(res.ResponseStatus == 'Success'){
      alert('updated')
     }else{
      
     }
    })   
 }
 
 }
 