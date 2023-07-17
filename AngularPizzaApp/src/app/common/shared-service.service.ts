import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, observable, Observable, ReplaySubject } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  public loginUser: string='';
  private userSource = new ReplaySubject<any>(0); 
  currentUser$ = this.userSource.asObservable();

  


  constructor(private http:HttpClient) { }

  UserSignIn(obj:any){
    return this.http.post('http://localhost:3000/Register',obj)
  }

  UserLogin(obj:any){
   //this.currentUser.next(obj);
   return this.http.post('http://localhost:3000/login',obj)

  }
  checkUserExists(obj:any){
   return this.http.post('http://localhost:3000/checkUserExists',obj)
  }

  sendUser(user: any) {
    this.userSource.next(user);
  }
// loggedInUser(): any {
//     return this.currentUser as Observable<any>;
// }

}
