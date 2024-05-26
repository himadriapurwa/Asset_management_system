import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetmanagernavComponent } from './assetmanagernav.component';

describe('AssetmanagernavComponent', () => {
  let component: AssetmanagernavComponent;
  let fixture: ComponentFixture<AssetmanagernavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetmanagernavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetmanagernavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
