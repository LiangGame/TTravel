import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WantToGoComponent } from './want-to-go.component';

describe('WantToGoComponent', () => {
  let component: WantToGoComponent;
  let fixture: ComponentFixture<WantToGoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WantToGoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WantToGoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
