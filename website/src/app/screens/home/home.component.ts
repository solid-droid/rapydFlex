import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/services/get-data/get-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currency:string = 'USD';
  payNow = false;
  constructor(
    public readonly getData: GetDataService,
  ) { }

  ngOnInit(): void {
  }

}
