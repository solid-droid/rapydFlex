import { Component, OnInit } from '@angular/core';
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
    private readonly getData: GetDataService,
    ) { }

  items = [
    {
      icon: 'pi pi-sign-out',
      command: () => {
          this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
      }
    },
    {
        icon: 'pi pi-shopping-cart',
        command: () => {
            this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
        }
    },
    {
        icon: 'pi pi-shopping-bag',
        command: () => {
            this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
        }
    }
];

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('user');
    this.getData.showLogin = true;
  }
}
