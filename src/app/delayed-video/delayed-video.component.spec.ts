import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelayedVideoComponent } from './delayed-video.component';

describe('DelayedVideoComponent', () => {
  let component: DelayedVideoComponent;
  let fixture: ComponentFixture<DelayedVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DelayedVideoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DelayedVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
