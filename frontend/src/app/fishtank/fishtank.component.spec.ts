import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishtankComponent } from './fishtank.component';

describe('FishtankComponent', () => {
  let component: FishtankComponent;
  let fixture: ComponentFixture<FishtankComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FishtankComponent]
    });
    fixture = TestBed.createComponent(FishtankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
