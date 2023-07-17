import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './common/gaurds/authentication.guard';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [

  {path:'Login', component:LoginComponent},
  {path:'',redirectTo:'/Login',pathMatch:'full'},
  {path:'Sign-up',component:SignUpComponent},
 
    {
      path: 'User',
      loadChildren: () => import('./User/module/user/user.module').then(x => x.UserModule)
      canActivate:[AuthenticationGuard]
   },
   {
    path: 'Admin',
    loadChildren: () => import('./Admin/modules/admin/admin.module').then(x => x.AdminModule),
    canActivate:[AuthenticationGuard]
  },
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
