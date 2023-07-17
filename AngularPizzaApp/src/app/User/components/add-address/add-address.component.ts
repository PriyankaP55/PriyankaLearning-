import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CommomUserService } from '../../services/commom-user.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {
  addressForm:FormGroup;
   UserId:number=0;

constructor(private fb:FormBuilder,private shared:CommomUserService,private snackBar:AppComponent,private router:Router){

  this.addressForm = this.fb.group({
  Address:['',Validators.required],  
  Landmark:['',Validators.required],  
  ZipCode:['',Validators.required],  
  City:['',Validators.required],  
  State:['',Validators.required],  
  Country:['',Validators.required],  
  //Address2:['',Validators.required],  
  })

}

ngOnInit(): void {
  this.UserId = Number(localStorage.getItem('UserId'));
  this.getAddressDetails();
}

getAddressDetails(){
  let zipcode = this.addressForm.get('ZipCode')?.value
   this.shared.GetAddressByZip(zipcode).subscribe((res:any)=>{
    if(zipcode){
     this.addressForm.patchValue({
       City: res[0]['PostOffice'][0]['Block'],
       State: res[0]['PostOffice'][0]['State'],
       Country: res[0]['PostOffice'][0]['Country'],
       //Address2: res[0]['PostOffice'][0]['Name'],

    });
  }else{
    this.addressForm.get('City')?.reset();
    this.addressForm.get('State')?.reset();
    this.addressForm.get('Country')?.reset();
    //this.addressForm.get('Address2')?.reset();

  }
    console.log(res[0]['PostOffice'][0]['Country'])
     
  });
 }

AddAddress(form:any){
  //let obj:any={};
  form.value.UserId = this.UserId;
  ///obj.DocId = id;
  this.shared.SaveAddressDetails(form.value).subscribe((res:any)=>{
   if(res){
    this.snackBar.show('Address added successfully')
   
     this.router.navigateByUrl('User/user-cart');


   }else{

   }
  })
}
}
