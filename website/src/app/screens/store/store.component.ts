import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  constructor() { }

  url = '';
  ngOnInit(): void {
    this.url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  }

  publish() {
    this.url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  }
}
