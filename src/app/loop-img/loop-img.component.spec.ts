import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoopImgComponent } from './loop-img.component';

describe('LoopImgComponent', () => {
  let component: LoopImgComponent;
  let fixture: ComponentFixture<LoopImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoopImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoopImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
