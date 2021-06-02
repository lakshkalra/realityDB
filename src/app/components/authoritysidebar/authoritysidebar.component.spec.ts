import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthoritysidebarComponent } from './authoritysidebar.component';

describe('AuthoritysidebarComponent', () => {
  let component: AuthoritysidebarComponent;
  let fixture: ComponentFixture<AuthoritysidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthoritysidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthoritysidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
