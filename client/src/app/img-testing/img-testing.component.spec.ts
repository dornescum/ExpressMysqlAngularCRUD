import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgTestingComponent } from './img-testing.component';

describe('ImgTestingComponent', () => {
  let component: ImgTestingComponent;
  let fixture: ComponentFixture<ImgTestingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImgTestingComponent]
    });
    fixture = TestBed.createComponent(ImgTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
