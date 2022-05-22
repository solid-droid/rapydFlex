import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from 'src/app/services/get-data/get-data.service';

@Component({
  selector: 'app-routing-control',
  templateUrl: './routing-control.component.html',
  styleUrls: ['./routing-control.component.scss']
})
export class RoutingControlComponent implements OnInit, OnDestroy {
  $subscription1:any;
  constructor(
    private route: ActivatedRoute,
    private readonly getData: GetDataService,
    ) { }
  ngOnDestroy() {
    this.$subscription1?.unsubscribe();
  }

  ngOnInit(): void {
    this.$subscription1 = this.route.params.subscribe((params:any) => {
      this.getData.setRoute(params.type, params.id);
    });
  }

}
