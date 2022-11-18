import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanRepasTableComponent } from './plan-repas-table.component';

describe('PlanRepasTableComponent', () => {
  let component: PlanRepasTableComponent;
  let fixture: ComponentFixture<PlanRepasTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanRepasTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanRepasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
