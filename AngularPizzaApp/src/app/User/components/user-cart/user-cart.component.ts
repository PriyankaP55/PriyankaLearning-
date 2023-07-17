import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { CommomUserService } from '../../services/commom-user.service';
import { HttpErrorResponse } from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import * as $ from "jquery";
import { ViewEncapsulation } from '@angular/core';
declare var jQuery:any;
@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss'],
  //encapsulation: ViewEncapsulation.ShadowDom
})
export class UserCartComponent {
CartDetails:FormGroup;
addressForm:FormGroup;
DocId:number=0;
img:string='';
docName:string='';
price:any;
val:any=1
changePrice:number=0;
IsCartEmpty:boolean=false;
CartEmpty:boolean=false;
OrderPlaced:boolean=false;
cartData:any=[];
userId:number=0;
TotalPrice:number=0;
CartDataCount:number=0;
addressDetails:any;
selectedAddress:string=''
constructor(private shared:CommomUserService,private snackBar: AppComponent,private fb : FormBuilder,private router:Router,public dialog: MatDialog){
  this.CartDetails = this.fb.group({
   Address : ['',Validators.required],
   MobileNumber : ['',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),Validators.maxLength(10)]],
  }),
  this.addressForm = new FormGroup({
    savedAddress: new FormControl('')
  });
  // this.addressForm = this.fb.group({
  //  savedAddress : ['',],
  // })
}

ngOnInit(): void {

  this.DocId = Number(localStorage.getItem('DocId'));
  this.userId = Number(localStorage.getItem('UserId'));

  this.getAllCartItems();
  this.getUserAddress();
}
AddAddress(){
  this.router.navigateByUrl('/User/add-address')
}
getAllCartItems()
{
  this.shared.GetAllCartItems( this.userId ).subscribe((res:any)=>{
   if(res.data.length >0){
    this.CartEmpty = true;
    this.cartData = res['data']
    let totalPrice = res.data;
    this.CartDataCount = totalPrice.length;
    for(var i =0;i<totalPrice.length;i++){
        this.TotalPrice += totalPrice[i]['Price'];
    }

   }else{
    this.IsCartEmpty = true;
    this.CartEmpty = false;
   }
    //this.docName = res[0]['DocName'];
  }, (error: HttpErrorResponse) => {
    this.IsCartEmpty = true;
  });
  
}
SelectedAddress(form:any){
   this.selectedAddress = this.addressForm.value.savedAddress;
   
}
AddQuantity(item:number){
  let values = item;
  if(this.val>=0)this.val += 1;
  this.changePrice = this.price * this.val
  console.log('add price ----',this.changePrice)
  this.price = this.changePrice
}
RemoveQuantity(){

  if(this.val>1)this.val = this.val - 1;
  this.price = (this.changePrice) - (this.price);

}

RemoveCartItems(data:any)
{
  this.shared.RemoveCartItems(data.DocId,this.userId).subscribe((res:any)=>{
    this.snackBar.show('Item removed');
    let TotalAmount = Number(this.TotalPrice) - Number(data.Price);
    this.TotalPrice = TotalAmount ;

    this.getAllCartItems();
  })
}

InsertOrderDetails(val:any)
{
  if(this.CartDetails.valid){
  for(var i = 0;i < val.length;i++ ){
    let obj:any={}
    obj.DocId = val[i]['DocId'];
    obj.UserId = val[i]['UserId'];
    obj.Address = this.CartDetails.controls['Address'].value
    obj.MobileNumber = this.CartDetails.controls['MobileNumber'].value
    this.shared.InsertOrderDetails(obj).subscribe((res:any)=>{

      if(res.ResponseStatus == 'Success'){
       this.CartDetails.reset();
       this.router.navigateByUrl('/User/order-placed')
        this.OrderPlaced = true
       this.IsCartEmpty = false;
       this.CartEmpty = false;
      }else{
        this.OrderPlaced = false
        this.IsCartEmpty = true;
        this.CartEmpty = false;
       }
     })
  }

  }
}

getUserAddress()
{
  this.shared.getUserAddress( this.userId ).subscribe((res:any)=>{
   if(res.data.length >0){
    this.CartEmpty = true;
     this.addressDetails = res.data
   }else{
    this.IsCartEmpty = true;
    this.CartEmpty = false;
   }
    //this.docName = res[0]['DocName'];
  }, (error: HttpErrorResponse) => {
    this.IsCartEmpty = true;
  });
  
}
selectAddress(){
  //$("#myModal").modal("toggle");
  //($('#myModal') as any).modal('show');
}

}
