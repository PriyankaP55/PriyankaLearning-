import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceAdminService {

  constructor(private http:HttpClient) { }

  GetAllUsersOrders(){
    return this.http.get('http://localhost:3000/GetAllUsersOrders')
  }

  //get order status list
  GetOrderStatus(){
    return this.http.get('http://localhost:3000/GetOrderStatus')
  }
  
  UpdateOrderStatus(obj:any){
    return this.http.put('http://localhost:3000/UpdateOrderStatus',obj)
  }
  
  



}
