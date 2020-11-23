import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Category, Product } from '../../models/product';
import { ProductService } from 'src/app/services/Product.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-Products',
  templateUrl: './Products.component.html',
  styleUrls: ['./Products.component.scss']
})
export class ProductsComponent implements OnInit {
  @Input() product: Product;

  products: [];
  categories: Category[];

  constructor(private ProductService:ProductService,
              private router: Router) { }

  ngOnInit(): void {
    this.categories = Object.values(Category);
    this.ProductService.getProducts()
      .subscribe(
        res => this.products = res,
        err => {
          if (err instanceof HttpErrorResponse){
            if(err.status === 401){
              this.router.navigate(['/login'])
            }
          }
        }
      )
  }

  getOwnerById(id: string){
    return "asd";
  }

}
