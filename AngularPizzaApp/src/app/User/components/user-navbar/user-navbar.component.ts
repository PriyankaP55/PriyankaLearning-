import { ChangeDetectionStrategy, Component,   DoCheck,Input,   OnChanges,   OnInit,   SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import {SharedServiceService} from 'src/app/common/shared-service.service';

@Component({
    selector: 'app-user-navbar', 
    templateUrl: './user-navbar.component.html', 
    styleUrls: ['./user-navbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserNavbarComponent implements OnInit,OnChanges {
  @Input()text : any;
  @Input()cartCount : any;
   username : any;
   name : any;
   private loginUser : any;
   itemNum:any
  constructor(private router : Router, private shared : SharedServiceService) {
   // this.UserData = this.shared.currentUser
   // console.log('test----',this.username)

    }

    ngOnInit() { 
       
        this.shared.currentUser$.subscribe((user) => {
            this.loginUser = user;
          });
          console.log('user ------',this.loginUser);
        
    }
    ngOnChanges(changes : SimpleChanges) {
        this.itemNum = changes['cartCount'].currentValue;
        console.log('OnChanges',  this.itemNum );
    }


    signOut() {
        this.router.navigateByUrl('/Login');
        localStorage.setItem('Token', '')
    }


}
