import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetuptableComponent } from './setuptable.component';

describe('SetuptableComponent', () => {
  let component: SetuptableComponent;
  let fixture: ComponentFixture<SetuptableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetuptableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetuptableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
