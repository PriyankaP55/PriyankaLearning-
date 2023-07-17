import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.scss'],
  //encapsulation:ViewEncapsulation.ShadowDom
})
export class AdminNavBarComponent {
constructor(private router:Router){}



  signOut() {
    this.router.navigateByUrl('/Login');
}


}
