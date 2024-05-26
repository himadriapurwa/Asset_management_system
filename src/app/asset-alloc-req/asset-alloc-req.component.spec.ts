import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetAllocReqComponent } from './asset-alloc-req.component';

describe('AssetAllocReqComponent', () => {
  let component: AssetAllocReqComponent;
  let fixture: ComponentFixture<AssetAllocReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetAllocReqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetAllocReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
