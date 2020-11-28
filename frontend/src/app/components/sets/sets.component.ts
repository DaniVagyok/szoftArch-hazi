import { Component, Input, OnInit } from '@angular/core';

import { ProductSet } from '../../models/productSet';
import { SetsService } from 'src/app/services/sets.service';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/Product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.scss']
})
export class SetsComponent implements OnInit {
  @Input() product: Product;
  @Input() searchValue: string;
  @Input() addSetName: string;
  @Input() assignSetValue: string;

  selectedProduct: string;
  sets: ProductSet[];
  products: Product[];
  filtered: ProductSet[];
  productsNotInSet: Product[];
  users: User[];

  constructor(private setsService:SetsService,
              private productService:ProductService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.sets = this.setsService.getSets();
    this.filtered = this.setsService.getSets();
    this.users = this.userService.getUsers();
    this.productService.getProducts()
    .subscribe(
      res => {
        this.products = res
        this.productsNotInSet = this.products.filter(p => !p.set).sort((a, b) => a.name.localeCompare(b.name))
      },
      err => {
        if (err instanceof HttpErrorResponse){
          console.log(err)
        }
      }
    );
  }

  assignSet(id: number){
    if(this.assignSetValue){
      this.setsService.assignSet(id, this.assignSetValue)
      this.assignSetValue=''
    }
  }

  takeBackSet(id:number){
    this.setsService.takeBackSet(id)
  }

  addProductToSet(setid:number){
    this.setsService.addProductToSet(setid, this.selectedProduct)
  }

  addSet(){
    this.setsService.addSet(this.addSetName)
    .subscribe(
      res =>{ 
        console.log(res)      
      },
      err => console.log(err)
      )
      this.addSetName="";
  }

  applyFilter(str:string){
    this.filtered = this.sets.filter(p => p.name.toLowerCase().includes(str.toLowerCase()));
  }

  resetFilter(){
    this.filtered = this.sets;
    this.searchValue = "";
  }

  selectChangeHandler(event:any){
    this.selectedProduct = event.target.value
  }

}
