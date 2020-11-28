import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Category, Product } from '../../models/product';
import { ProductService } from 'src/app/services/Product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { $ } from 'protractor';

@Component({
  selector: 'app-Products',
  templateUrl: './Products.component.html',
  styleUrls: ['./Products.component.scss']
})
export class ProductsComponent implements OnInit {
  @Input() product: Product;
  @Input() searchValue: string;
  @Input() addCategoryName: string;
  @Input() addProductName: string;
  @Input() addProductCategory: string;
  @Input() addFile: File;


  selectedCategory: string;
  products: Product[];
  filtered: Product[];
  categories: Category[];

  constructor(private productService:ProductService,
              private router: Router) { }

  ngOnInit(): void {
    this.categories = Object.values(Category);
    this.productService.getProducts()
    .subscribe(
      res => {
        this.filtered = res;
        this.products = res
      },
      err => {
        if (err instanceof HttpErrorResponse){
          if(err.status === 401){
            this.router.navigate(['/login'])
          }
        }
      }
    );

  }

  getOwnerById(id: string){
    return "asd";
  }

  containsStr(element, index, array, str){
    return element.toString.includes(str)
  }

  addCategory(name: string){
    this.productService.addCategory(this.addCategoryName)
    .subscribe(
      res =>{ 
        console.log(res)      
      },
      err => console.log(err)
      )
      this.addCategoryName="";
  }

  applyFilter(str:string){
    this.filtered = this.products.filter(p => p.name.toLowerCase().includes(str.toLowerCase()));
  }

  resetFilter(){
    this.filtered = this.products;
    this.searchValue = "";
  }

  selectChangeHandler(event:any){
    this.selectedCategory = event.target.value
  }

}
