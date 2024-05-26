import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptheadapprovalComponent } from './deptheadapproval.component';

describe('DeptheadapprovalComponent', () => {
  let component: DeptheadapprovalComponent;
  let fixture: ComponentFixture<DeptheadapprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptheadapprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeptheadapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
