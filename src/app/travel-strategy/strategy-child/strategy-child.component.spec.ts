import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategyChildComponent } from './strategy-child.component';

describe('StrategyChildComponent', () => {
  let component: StrategyChildComponent;
  let fixture: ComponentFixture<StrategyChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrategyChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategyChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
