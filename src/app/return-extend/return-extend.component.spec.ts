import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnExtendComponent } from './return-extend.component';

describe('ReturnExtendComponent', () => {
  let component: ReturnExtendComponent;
  let fixture: ComponentFixture<ReturnExtendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnExtendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnExtendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
