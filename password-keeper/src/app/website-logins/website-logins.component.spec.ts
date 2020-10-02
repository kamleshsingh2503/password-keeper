import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteLoginsComponent } from './website-logins.component';

describe('WebsiteLoginsComponent', () => {
  let component: WebsiteLoginsComponent;
  let fixture: ComponentFixture<WebsiteLoginsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteLoginsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteLoginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
