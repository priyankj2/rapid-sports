import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalForceComponent } from './vertical-force.component';

describe('VerticalForceComponent', () => {
  let component: VerticalForceComponent;
  let fixture: ComponentFixture<VerticalForceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerticalForceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerticalForceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
