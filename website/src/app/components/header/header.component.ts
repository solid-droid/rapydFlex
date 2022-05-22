import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GetDataService } from 'src/app/services/get-data/get-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [MessageService]
})
export class HeaderComponent implements OnInit {

  constructor(
    private messageService: MessageService,
    private router: Router,
    private readonly getData: GetDataService,
    ) { }

  items = [
    {
      icon: 'pi pi-sign-out',
      command: () => {
         this.logout();
      }
    },
    {
      icon: 'pi pi-book',
      command: () => {
          this.pastOrders();  
        // this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
      }
    },
    {
        icon: 'pi pi-shopping-cart',
        command: () => {
            this.loadHome();
        }
    },
    {
        icon: 'pi pi-shopping-bag',
        command: () => {
            this.loadShop();  
          // this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
        }
    }
];

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('user');
    this.getData.showLogin = true;
  }

  loadHome(){
    this.router.navigate(['']);
  }

  loadShop(){
    this.router.navigate(['flexshop']);
  }

  pastOrders(){
    this.router.navigate(['pastorders']);
  }
}
