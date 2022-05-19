import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  totalPrice:number = 10000;
  currency:string = 'USD';
  payNow = false;
  constructor() { }

  ngOnInit(): void {
  }

}
