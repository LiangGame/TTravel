import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesChildComponent } from './notes-child.component';

describe('NotesChildComponent', () => {
  let component: NotesChildComponent;
  let fixture: ComponentFixture<NotesChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
