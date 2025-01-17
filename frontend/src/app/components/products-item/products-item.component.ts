import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { INewRentModel, ProductSet } from 'src/app/models/productSet';
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
  @Input() category: string;
  @Input() myId: number;
  @Input() assignNameValue: User;

  users: User[];
  sets: ProductSet[];
  newRentProduct: INewRentModel;

  groupInfo: {
    groupId: number,
    memberId: number,
    groupName: string,
    isAdminInGroup: boolean
  }

  constructor(private productService: ProductService,
              private userService: UserService,
              private setService: SetsService) { }

  ngOnInit(): void {
    this.userService.getGroup()
      .subscribe(
        res => {
          this.groupInfo = res;
        },
        err => console.log(err)
      );

    this.setService.getSets(this.groupInfo.groupId).subscribe(
      res => {
        this.sets = res;
      }
    );

    this.userService.getUsersInGroup(this.groupInfo.groupId)
        .subscribe(
          res => {
            this.users = res;
          },
          err => console.log(err)
        );
  }

  assignProduct(prodId){
    this.newRentProduct.memberId=this.assignNameValue.id;
    this.newRentProduct.id=prodId;
    this.productService.assignProduct(this.newRentProduct).subscribe;
  }

  takeBackProduct(id:number){
    this.productService.takeBackProduct(id).subscribe;
  }

  assignProductToSet(setId){
    this.productService.assignProductToSet(setId, this.product).subscribe;

  }

}
