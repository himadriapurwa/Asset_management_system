import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserrequestsComponent } from './userrequests.component';

describe('UserrequestsComponent', () => {
  let component: UserrequestsComponent;
  let fixture: ComponentFixture<UserrequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserrequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
