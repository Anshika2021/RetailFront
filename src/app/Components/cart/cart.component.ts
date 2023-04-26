import { HttpClient } from '@angular/common/http';
import { Component, OnInit, SimpleChange } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CartService } from 'src/app/Service/cart.service';
import { SnackbarService } from 'src/app/Service/snackbar.service';
import { UserService } from 'src/app/Service/user.service';

import { CheckoutComponent } from '../checkout/checkout.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
 cartItems:any;
 grandTotal:any=0;
  responseMessage: any;
  //  grandTotal:any =0;
    totalAmount:any = 0;
  item: any;
//  public cartItemList:any=[];
//  public productList = new BehaviorSubject<any>([])
constructor(private httpClient:HttpClient, private cartService:CartService,private dialog:MatDialog,private route:ActivatedRoute,private snackBarService:SnackbarService,private userServicec:UserService )
{
  
  // this.grandTotal();
}
  ngOnInit(): void {
  //  this.getUserCartItems(1);
   this.route.queryParams.subscribe((data:any)=>{
    console.log(this.userServicec.cartId);
    this.grandTotal= this.getUserCartItems(localStorage.getItem("cartId"));
   })

  //  this.grandTotalAmount();
  }

  // cartItems:any=[];
  // getUserCartItems(){
  //   if(localStorage['getUserCart']('cartId')){
  //     this.cartItems = JSON.parse(localStorage['getUserCart']('cartId'));
  //     console.log(this.cartItems);

  //   }
  // }
  ngOnChanges()
  {
    this.grandTotal = this.cartService.totalAmountCart();
    console.log(this.grandTotal)
  }
  
    
  

// getProducts()
// {
//   return this.productList.asObservable()
// }
// setProducts(product:any)
// {
//   this.cartItemList.push(...product);
//   this.productList.next(product);
// }

checkoutClickHandler()
{
  const dialogConfig = new MatDialogConfig();
  dialogConfig.width = "900px";
  this.dialog.open(CheckoutComponent,dialogConfig);
}

getUserCartItems(id:any)
{

  this.cartService.getUserCart(id).subscribe((res)=>{
    this.cartItems=res;
    this.cartItems.map((a:any)=>
    {

          this.totalAmount+= +(a.prod_price*a.prod_quantity);

      // if(a.prod_quantity=1){
      // this.totalAmount+= +(a.prod_price*a.prod_quantity);}
      // else
      //   if(a.prod_quantity>1){
      //     this.totalAmount+= +(a.prod_price*a.prod_quantity+a.prod_price);
      //   }
    })
  })
  return this.totalAmount;
}
deleteCartItem(cartItemId:any)
{
  
  this.cartService.deleteCartItems(cartItemId).subscribe((res:any)=>{
    this.removeCartItem(cartItemId)
    console.log(res);
    this.responseMessage = res?.message;
      this.snackBarService.openSnackBar(this.responseMessage,"error");
  })
}
removeCartItem(cartItemId:any)
{
  this.cartItems.map((a:any,index:any)=>{
    if(cartItemId== a.cartItemId)
    {
      this.cartItems.splice(index,1);
    }
  })
}


incQnt(prod_id: any, prod_quantity: any){
  for(let i=0; i<this.cartItems.length; i++){
if(this.cartItems[i].prod_id === prod_id){
  this.cartItems[i].prod_quantity = parseInt(prod_quantity)+1;


}
  }
  localStorage.setItem('cartId', JSON.stringify(this.cartItems));
  // console.log(prod_id);
  // console.log(prod_quantity);

}



decQnt(prod_id: any, prod_quantity: any){
  for(let i=0; i<this.cartItems.length; i++){
if(this.cartItems[i].prod_id === prod_id){
  if(prod_quantity !=1)
  this.cartItems[i].prod_quantity = parseInt(prod_quantity)-1;


}
  }
  localStorage.setItem('id', JSON.stringify(this.cartItems));
  // console.log(prod_id);
  // console.log(prod_quantity);

}


// total:number = 0;
// loadCart(){
//   if(localStorage['getUserCart']('cartId')){
//     this.cartItems = JSON.parse(localStorage['getUserCart']('cartId'));
//     this.total = this.cartItems.reduce(function(acc: number, val: { prod_price: number; prod_quantity: number; }){
//       return acc + (val.prod_price*val.prod_quantity);




//     }, 0);
//   }


// }

// deleteAllByUserId( )
// grandTotalAmount()
// {
// this.grandTotal=0;

//     this.cartItems.array.forEach((element:any) => {
//       this.grandTotal=this.grandTotal+element.prod_price;
//     });
    
//   }




}


