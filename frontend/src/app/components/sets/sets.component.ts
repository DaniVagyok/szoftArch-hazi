import { Component, OnInit } from '@angular/core';

import { ProductSet } from '../../models/productSet';
import { SetsService } from 'src/app/services/sets.service';

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.scss']
})
export class SetsComponent implements OnInit {

  sets: ProductSet[];

  constructor(private SetsService:SetsService) { }

  ngOnInit(): void {
    this.sets = this.SetsService.getSets();
  }

}
