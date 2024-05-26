import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetmanagerscreenComponent } from './assetmanagerscreen.component';

describe('AssetmanagerscreenComponent', () => {
  let component: AssetmanagerscreenComponent;
  let fixture: ComponentFixture<AssetmanagerscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetmanagerscreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetmanagerscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
