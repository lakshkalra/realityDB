import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoyalityComponent } from './royality.component';

describe('RoyalityComponent', () => {
  let component: RoyalityComponent;
  let fixture: ComponentFixture<RoyalityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoyalityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoyalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
