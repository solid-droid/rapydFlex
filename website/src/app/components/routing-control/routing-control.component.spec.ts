import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingControlComponent } from './routing-control.component';

describe('RoutingControlComponent', () => {
  let component: RoutingControlComponent;
  let fixture: ComponentFixture<RoutingControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutingControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutingControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
