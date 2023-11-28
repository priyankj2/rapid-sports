import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterPressureComponent } from './center-pressure.component';

describe('CenterPressureComponent', () => {
  let component: CenterPressureComponent;
  let fixture: ComponentFixture<CenterPressureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CenterPressureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CenterPressureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
