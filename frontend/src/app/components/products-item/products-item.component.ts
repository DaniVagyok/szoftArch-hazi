import { Component, OnInit, Input } from '@angular/core';
import { Category, Product } from 'src/app/models/product';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.scss']
})
export class ProductsItemComponent implements OnInit {
  @Input() product: Product;
  @Input() category: Category;

  constructor() { }

  ngOnInit(): void {
  }

}
