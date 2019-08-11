import { Component, OnInit } from '@angular/core';
import {Supply} from "../../models/supplying";
import {SupplyingService} from "../../services/supplying.service";

@Component({
  selector: 'app-supplying',
  templateUrl: './supplying.component.html',
  styleUrls: ['./supplying.component.scss']
})
export class SupplyingComponent implements OnInit {

  supplyingList: Supply[];

  displayedColumns: string[] = ['designation', 'emplacement', 'rayon', 'actions'];

  constructor(private supplyingService: SupplyingService) { }

  ngOnInit() {
    this.supplyingService.getSupplyingList().subscribe(
      (supplyingList: Supply[]) => {
        this.supplyingList = supplyingList;
      }
    );
  }

}
