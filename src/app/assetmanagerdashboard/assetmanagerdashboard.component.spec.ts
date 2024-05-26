import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetmanagerdashboardComponent } from './assetmanagerdashboard.component';

describe('AssetmanagerdashboardComponent', () => {
  let component: AssetmanagerdashboardComponent;
  let fixture: ComponentFixture<AssetmanagerdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetmanagerdashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetmanagerdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
