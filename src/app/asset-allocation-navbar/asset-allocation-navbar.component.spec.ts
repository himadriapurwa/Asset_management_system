import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetAllocationNavbarComponent } from './asset-allocation-navbar.component';

describe('AssetAllocationNavbarComponent', () => {
  let component: AssetAllocationNavbarComponent;
  let fixture: ComponentFixture<AssetAllocationNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetAllocationNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetAllocationNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
