import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthoritydashboardComponent } from './authoritydashboard.component';

describe('AuthoritydashboardComponent', () => {
  let component: AuthoritydashboardComponent;
  let fixture: ComponentFixture<AuthoritydashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthoritydashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthoritydashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
