import { Component, Input, OnInit } from '@angular/core';

import { INewProductSet, INewRentModel, ProductSet } from '../../models/productSet';
import { SetsService } from 'src/app/services/sets.service';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/Product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Member, User } from 'src/app/models/user';
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
  selectedMember: string;
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
              },
              err => {
                if (err instanceof HttpErrorResponse) {
                  console.log(err);
                }
              }
            );
        },
        err => console.log(err)
      );
  }

  assignSet(setId) {
    console.log(this.selectedMember);
    console.log(setId);
    //this.newRentSet.memberId = this.selectedMember.id;
    //this.newRentSet.id = setId;
    this.setService.assignSet({ id: setId, memberId: parseInt(this.selectedMember) })
      .subscribe(
        res => {
          this.setService.getSets(this.groupInfo.id, this.searchSetValue).subscribe(
            res => {
              this.sets = res;
              this.filtered = res;
            }
          );
        }

      );
    this.assignSetValue = '';
  }

  takeBackSet(id: number) {
    this.setService.takeBackSet(id).subscribe(() => {
      this.setService.getSets(this.groupInfo.id, this.searchSetValue).subscribe(
        res => {
          this.sets = res;
          this.filtered = res;
        }
      );
    });
  }

  addProductToSet(setid: number) {
    let prod: Product = {ownerName:'',id: parseInt(this.selectedProduct), categoryName:'', name:''};
    this.productService.assignProductToSet(setid, prod).subscribe(); // ennek id product id-nak kell lennie
  }

  addSet() {
    console.log(this.addSetName);
    this.setService.addSet(this.groupInfo.id, { name: this.addSetName })
      .subscribe();
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
