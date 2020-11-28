import { Component, OnInit, Input } from '@angular/core';
import { Category, Product } from 'src/app/models/product';
import { ProductSet } from 'src/app/models/productSet';
import { User } from 'src/app/models/user';
import { ProductService } from 'src/app/services/Product.service';
import { SetsService } from 'src/app/services/sets.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.scss']
})
export class ProductsItemComponent implements OnInit {
  @Input() product: Product;
  @Input() category: Category;
  @Input() myId: number;
  @Input() assignNameValue: string;

  users: User[];
  sets: ProductSet[];

  constructor(private productService: ProductService,
              private userService: UserService,
              private setService: SetsService) { }

  ngOnInit(): void {
    this.users=this.userService.getUsers()
    this.sets=this.setService.getSets()
  }

  assignProduct(id:number){
    if(this.assignNameValue){
      this.productService.assignProduct(id, this.assignNameValue)
      this.assignNameValue=''
    }
  }

  takeBackProduct(id:number){
    this.productService.takeBackProduct(id)
  }

  assignProductToSet(id:number){

  }

}
