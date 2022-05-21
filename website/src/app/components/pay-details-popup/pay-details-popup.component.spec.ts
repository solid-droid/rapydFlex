import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayDetailsPopupComponent } from './pay-details-popup.component';

describe('PayDetailsPopupComponent', () => {
  let component: PayDetailsPopupComponent;
  let fixture: ComponentFixture<PayDetailsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayDetailsPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
