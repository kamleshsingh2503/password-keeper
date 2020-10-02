import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayLoginsComponent } from './display-logins.component';

describe('DisplayLoginsComponent', () => {
  let component: DisplayLoginsComponent;
  let fixture: ComponentFixture<DisplayLoginsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayLoginsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayLoginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
