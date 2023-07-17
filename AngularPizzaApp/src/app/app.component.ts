import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AngularPizzaApp';
  userRole:any;
constructor(private snackBar:MatSnackBar){}
ngOnInit(): void {
  this.userRole = localStorage.getItem('UserRole')
}
  show(msg:string){

    this.snackBar.open(msg,'',{
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass:'snackBarClr'
      })
  }
}
