import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryscreenComponent } from './categoryscreen.component';

describe('CategoryscreenComponent', () => {
  let component: CategoryscreenComponent;
  let fixture: ComponentFixture<CategoryscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryscreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
