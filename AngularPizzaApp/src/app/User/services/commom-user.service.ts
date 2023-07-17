import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommomUserService {

constructor(private http:HttpClient) { }

//user sign in
UserSignIn(obj:any){
  return this.http.post('http://localhost:3000/Register',obj)
}

//user login
UserLogin(obj:any){
  return this.http.post('http://localhost:3000/login',obj)
}

//get all pizza imgs and details
GetAllimages(){
  return this.http.get('http://localhost:3000/GetAllImages')
}

//get imgs and details based on id
GetAllImagesById(id:number){
  return this.http.get('http://localhost:3000/GetImagesById/'+id)
}

// get all cart items based on userid
GetAllCartItems(id:number){
  return this.http.get('http://localhost:3000/GetAllCartItems/'+id)
}

//remove cart items based on id
RemoveCartItems(id:number,uId:number){
  return this.http.delete('http://localhost:3000/RemoveCartItems/'+id +'/'+ uId)
}

//method to insert order details
InsertOrderDetails(obj:any){
  return this.http.post('http://localhost:3000/SaveOrderDetails',obj)
}

//method to add to cart 
AddToCartItems(obj:any){
  return this.http.post('http://localhost:3000/AddToCartItems',obj)
}

//get all orders with details 
GetAllOrders(id:number){
  return this.http.get('http://localhost:3000/GetAllOrders/'+id)
}

//get user address by zipcode
GetAddressByZip(zid:any) {
  return this.http.get('https://api.postalpincode.in/pincode/'+zid)
}

//save user address details
SaveAddressDetails(obj:any){
  return this.http.post('http://localhost:3000/SaveAddressDetails',obj)
}

//get user addresses
getUserAddress(id:any) {
  return this.http.get('http://localhost:3000/GetAddress/'+id)
}

}
