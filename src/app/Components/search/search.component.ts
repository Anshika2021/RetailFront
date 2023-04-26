import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CartService } from 'src/app/Service/cart.service';
import { CatalogService } from 'src/app/Service/catalog.service';
import { SnackbarService } from 'src/app/Service/snackbar.service';
import { GlobalConstants } from 'src/app/shared/GlobalConstrants';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  // searchKey:string="";
// public filterCategory : any


  name:any;
  responseMessage:any;
inputForm:any=FormControl;
productList:any;
flag:any=false;
  // filterTitle: any;
  constructor(private catalogService:CatalogService, private cartService :CartService,private snackBarService:SnackbarService)
  {


   
    console.log(this.catalogService.name);
   this.name = this.catalogService.name;
   this.catalogService.searchByName(this.name).subscribe((res)=>{
    this.productList=res;
    console.log(this.productList);
   })
  }
  // searchProducts(){
  //   this.httpClient.get<any[]>('/api/products?search=$(this.searchTerm}').subscribe(
  //     (data) =>{
  //       this.searchResults = data;
  //     },
  //    ( error) => {
  //     console.log('Error fetching search results:' , error);
  //    }
  //   );
  // }
  ngOnInIt()
  {
    // this.inputForm = this.formBuilder.group({
    //   input:[null,[Validators.required]],
    // });

    this.catalogService.list.subscribe((name:any)=>{

      console.log("int th"+this.name);
     // console.log(name);
      this.catalogService.getname();
      
      this.productList=this.catalogService.productS;
      // if(name.title === "Dairy" || nmae.title === '' )
      const token:any = localStorage.getItem('token');
   
      if(token)
      {
        this.flag=true;
  
      }
      else{
        this.flag =false;
      }
     
  })
  




}



ngOnChanges()
{
  console.log("int th"+this.name);
  this.catalogService.getname(); 
}

addToCart(item:any)
 {
  if(this.flag === false)
  {
   this.snackBarService.openSnackBar("First Login","error");
  }
  else{
 this.cartService.add(item).subscribe((res:any)=>{
  console.log(res);
this.responseMessage = "Item Added In Cart";
 // this.sncakBarService.openSnackBar("nothing");
 },(error)=>{
  console.log(error);
  console.log(error.error)
  if(error.error)
  {
    this.responseMessage = error.error;
  }
  else{
    this.responseMessage = GlobalConstants.genricError;
  }
  this.snackBarService.openSnackBar(this.responseMessage,"error");
  
 });
}

 }
// filter(title:string){
//   this.filterTitle = this.productList
//   .filter((item:any)=>{
//     if(item.title == title || title ==''){
//       return item;
//     }
//   })
// }

}

