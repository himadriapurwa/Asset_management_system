import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptrqsthstryComponent } from './deptrqsthstry.component';

describe('DeptrqsthstryComponent', () => {
  let component: DeptrqsthstryComponent;
  let fixture: ComponentFixture<DeptrqsthstryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptrqsthstryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeptrqsthstryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
