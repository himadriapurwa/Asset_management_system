import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetmanagerhistoryComponent } from './assetmanagerhistory.component';

describe('AssetmanagerhistoryComponent', () => {
  let component: AssetmanagerhistoryComponent;
  let fixture: ComponentFixture<AssetmanagerhistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetmanagerhistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetmanagerhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
