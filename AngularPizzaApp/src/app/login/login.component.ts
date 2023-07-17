import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,NgForm,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SharedServiceService } from '../common/shared-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm:FormGroup;
  //name:any;
  employeenameLatest: any;
  error: any;

  constructor(private fb:FormBuilder,private router:Router,public shared:SharedServiceService){
  this.loginForm = this.fb.group({
    Email : ['',[Validators.required,Validators.email]],
    Password : ['',Validators.required],

  })
  }
  ngOnInit(): void {
  }

onSubmit(form:any){
  if(form.valid){
    this.shared.UserLogin(form.value).subscribe((res:any)=>{
      if(res.ResponseStatus == 'Success'){
      let token = res.Token;
      let uname = res.user.UserName;
      let userId = res.user.UserId;
      let userRole = res.user.UserRole;
      //this.name = uname;
      //this.name.next(uname)
      this.shared.sendUser(uname)
     localStorage.setItem('Token',token)
      localStorage.setItem('UserId',userId)
      if(userRole == 'Admin'){
        this.router.navigateByUrl('/Admin/admin-dashboard')
      }else{
        this.router.navigateByUrl('/User/user-dashboard')

      }
    }else if(res.ResponseStatus == 'Failed'){
      this.error = res.message
    }
    })
  }
}


}
