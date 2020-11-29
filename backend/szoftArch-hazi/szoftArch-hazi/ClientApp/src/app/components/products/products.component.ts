import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product, INewProductModel } from '../../models/product';
import { ProductService } from 'src/app/services/Product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { $ } from 'protractor';
import { UserService } from 'src/app/services/user.service';

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
  categories: string[];
  newProd: INewProductModel;

  groupInfo: {
    groupId: number,
    memberId: number,
    groupName: string,
    isAdminInGroup: boolean
  }

  constructor(private productService: ProductService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.userService.getGroup()
      .subscribe(
        res => {
          this.groupInfo = res;
        },
        err => console.log(err)
      );
      this.productService.getProducts(this.groupInfo.groupId)
        .subscribe(
          res => {
            this.filtered = res;
            this.products = res
          },
          err => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this.router.navigate(['/login'])
              }
            }
          }
        );
    this.productService.getCategories(this.groupInfo.groupId)
      .subscribe(
        res => {
          this.categories = res;
        },
        err => console.log(err)
      );

  }

  addProduct(){
    this.newProd.category = this.addProductCategory;
    this.newProd.name = this.addProductName;
    this.productService.addProduct(this.groupInfo.groupId, this.newProd).subscribe(
      res =>{ 
        console.log(res)      
      },
      err => console.log(err)
      )
      this.addProductName=""
      ;
  }

  getOwnerById(id: string) {
    return "asd";
  }

  containsStr(element, index, array, str) {
    return element.toString.includes(str)
  }

  addCategory(name: string) {
    this.productService.addCategory(this.addCategoryName, this.groupInfo.groupId)
      .subscribe(
        res => {
          console.log(res)
        },
        err => console.log(err)
      )
    this.addCategoryName = "";
  }

  applyFilter(str: string) {
    this.filtered = this.products.filter(p => p.name.toLowerCase().includes(str.toLowerCase()));
  }

  resetFilter() {
    this.filtered = this.products;
    this.searchValue = "";
  }

  selectChangeHandler(event: any) {
    this.selectedCategory = event.target.value
  }

}
