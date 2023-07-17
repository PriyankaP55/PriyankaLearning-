import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { SharedServiceService } from 'src/app/common/shared-service.service';
import { CommomUserService } from '../../services/commom-user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent {
allImgs:any=[];
url:string=''
UserId:any;
AddBtn:string='Add'
constructor(private router:Router,private dataService:SharedServiceService,private shared : CommomUserService,private snackBar:AppComponent){
  //this.dataService.loginData$.subscribe(data => console.log(data));

}

ngOnInit(){
 this.UserId = localStorage.getItem('UserId')
  this.url = 'http://localhost:3000/uploads/'
this.getImgs()
}

getImgs(){
 this.shared.GetAllimages().subscribe((res:any)=>{
  this.allImgs = res.data[0];
 // console.log(this.allImgs)
 })
}

AddItemss(id:number){
  localStorage.setItem('DocId',String(id));
  this.snackBar.show('Added successfully');
}

AddItems(id:any,index:any)
{
  let obj:any={};
  obj.UserId = Number(this.UserId);
  obj.DocId = id.DocId;
  this.shared.AddToCartItems(obj).subscribe((res:any)=>{
   if(res){
    this.snackBar.show('Added successfully')
    this.AddBtn = 'Added';
     //this.router.navigateByUrl('User/user-cart');


   }else{

   }
    //this.docName = res[0]['DocName'];
  })
}






}

