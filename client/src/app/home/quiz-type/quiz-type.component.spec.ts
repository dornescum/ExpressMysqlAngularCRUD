import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizTypeComponent } from './quiz-type.component';

describe('QuizTypeComponent', () => {
  let component: QuizTypeComponent;
  let fixture: ComponentFixture<QuizTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizTypeComponent]
    });
    fixture = TestBed.createComponent(QuizTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
