import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootprintComponent } from './footprint.component';

describe('FootprintComponent', () => {
  let component: FootprintComponent;
  let fixture: ComponentFixture<FootprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
