import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptheadnavComponent } from './deptheadnav.component';

describe('DeptheadnavComponent', () => {
  let component: DeptheadnavComponent;
  let fixture: ComponentFixture<DeptheadnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptheadnavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeptheadnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
