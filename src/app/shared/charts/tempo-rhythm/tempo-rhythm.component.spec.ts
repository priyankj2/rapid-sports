import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempoRhythmComponent } from './tempo-rhythm.component';

describe('TempoRhythmComponent', () => {
  let component: TempoRhythmComponent;
  let fixture: ComponentFixture<TempoRhythmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TempoRhythmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TempoRhythmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
