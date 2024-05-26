import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneraterequestComponent } from './generaterequest.component';

describe('GeneraterequestComponent', () => {
  let component: GeneraterequestComponent;
  let fixture: ComponentFixture<GeneraterequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneraterequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneraterequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
