import { Component, Input, OnInit } from '@angular/core';

import { INewProductSet, INewRentModel, ProductSet } from '../../models/productSet';
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
  selectedMember: User;
  sets: ProductSet[];
  products: Product[];
  filtered: ProductSet[];
  productsNotInSet: Product[];
  users: User[];
  newSet: INewProductSet;
  newRentSet: INewRentModel;
  searchSetValue = '';

  groupInfo: {
    id: number,
    memberId: number,
    groupName: string,
    isAdminInGroup: boolean
  };

  constructor(private setService: SetsService,
    private productService: ProductService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getGroup()
      .subscribe(
        res => {
          this.groupInfo = res;
        },
        err => console.log(err)
      );

    this.setService.getSets(this.groupInfo.id, this.searchSetValue).subscribe(
      res => {
        this.sets = res;
        this.filtered = res;
      }
    );

    this.userService.getUsersInGroup(this.groupInfo.id)
      .subscribe(
        res => {
          this.users = res;
        },
        err => console.log(err)
      );

    this.productService.getProducts(this.groupInfo.id, this.searchSetValue)
      .subscribe(
        res => {
          this.products = res;
          this.productsNotInSet = this.products.filter(p => !p.set).sort((a, b) => a.name.localeCompare(b.name));
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            console.log(err);
          }
        }
      );
  }

  assignSet(setId) {
    this.newRentSet.memberId = this.selectedMember.id;
    this.newRentSet.id = setId;
    this.setService.assignSet(this.newRentSet);
    this.assignSetValue = '';
  }

  takeBackSet(id: number) {
    this.setService.takeBackSet(id).subscribe();
  }

  addProductToSet(setid: number) {
    this.setService.addProductToSet(setid, this.selectedProduct).subscribe();
  }

  addSet() {
    this.newSet.name = this.addSetName;
    this.setService.addSet(this.groupInfo.id, this.newSet)
      .subscribe(
        res => {
          console.log(res);
        },
        err => console.log(err)
      );
    this.addSetName = '';
  }

  applyFilter(str: string) {
    this.filtered = this.sets.filter(p => p.name.toLowerCase().includes(str.toLowerCase()));
  }

  resetFilter() {
    this.filtered = this.sets;
    this.searchValue = '';
  }

  selectChangeHandler(event: any) {
    this.selectedProduct = event.target.value;
  }

  selectChangeMemberHandler(event: any) {
    this.selectedMember = event.target.value;
  }

}
