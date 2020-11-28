import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductSet } from 'src/app/models/productSet';
import { ProductService } from 'src/app/services/Product.service';
import { SetsService } from 'src/app/services/sets.service';

@Component({
  selector: 'app-my-stuff',
  templateUrl: './my-stuff.component.html',
  styleUrls: ['./my-stuff.component.scss']
})
export class MyStuffComponent implements OnInit {

  myId:number = 1;
  products: Product[];
  sets: ProductSet[];

  constructor(private setsService:SetsService,
              private productService:ProductService) { }

  ngOnInit(): void {
    this.sets = this.setsService.getSets();
    this.productService.getProducts()
    .subscribe(
      res => {
        this.products = res
      }
    );
  }

}
