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

  myId: number;
  myProducts: Product[];
  mySets: ProductSet[];
  searchValue = '';

  groupInfo: {
    groupId: number,
    memberId: number,
    groupName: string,
    isAdminInGroup: boolean
  };

  constructor(private setsService: SetsService,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.setsService.getMySets(this.groupInfo.memberId, this.searchValue).subscribe(
      res => {
          this.mySets = res;
      }
    );
    this.productService.getMyProducts(this.groupInfo.memberId, this.searchValue).subscribe(
      res => {
          this.myProducts = res;
      }
    );
  }

}
