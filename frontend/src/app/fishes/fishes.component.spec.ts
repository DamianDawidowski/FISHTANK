import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishesComponent } from './fishes.component';

describe('FishesComponent', () => {
  let component: FishesComponent;
  let fixture: ComponentFixture<FishesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FishesComponent]
    });
    fixture = TestBed.createComponent(FishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
