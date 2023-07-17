import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,NgForm,FormControlName } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { SharedServiceService } from '../common/shared-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  loginForm:FormGroup;
  passwordErr:string='';
  isSubmitClicked: boolean = false;
   err:string='';
  constructor(private fb:FormBuilder,private shared:SharedServiceService,private router:Router,private snackBar:AppComponent){
  this.loginForm = this.fb.group({
  UserName : ['',[Validators.required]],
  Email : ['',[Validators.required,Validators.email]],
  Mobile : ['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),Validators.maxLength(10)]],
  Password : ['',[Validators.required,Validators.maxLength(4)]],
  ConfirmPassword : ['',[Validators.required,Validators.maxLength(4)]],
  },
 
 )
}

ngOnInit(){
  //this.snackBar.show('User created')
}

ConfirmedValidator(formGroup: FormGroup) {
  const  password  = formGroup.get('Password');
  const confirmPassword  = formGroup.get('ConfirmPassword');
  return password === confirmPassword ? null : { passwordNotMatch: true };
}

onSubmit(form:any){
 if(form.valid && (!this.err)){
  if(this.loginForm.controls['Password'].value == this.loginForm.controls['ConfirmPassword'].value){
    this.shared.UserSignIn(form.value).subscribe(res=>{
      
       this.snackBar.show('User created successfully');
       this.router.navigateByUrl('/Login')
       form.reset();
       form.submitted = false;
    })
  }else{
    this.passwordErr = 'Password & confirm password should match.'
  }
 
}
}

//check user exists or not
checkUserExists(){
  let obj :any={}
  let email = this.loginForm.controls['Email'].value ;
  obj.Email =  email;
  if(email){
    this.shared.checkUserExists(obj).subscribe((user:any) => {
      if(user.ResponseStatus == 'Success'){
        this.err = 'User already exist'

      }
     });
  }
}
}
