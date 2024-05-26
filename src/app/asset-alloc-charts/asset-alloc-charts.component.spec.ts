import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetAllocChartsComponent } from './asset-alloc-charts.component';

describe('AssetAllocChartsComponent', () => {
  let component: AssetAllocChartsComponent;
  let fixture: ComponentFixture<AssetAllocChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetAllocChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetAllocChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
