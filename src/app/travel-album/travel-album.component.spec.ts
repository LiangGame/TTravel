import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAlbumComponent } from './travel-album.component';

describe('TravelAlbumComponent', () => {
  let component: TravelAlbumComponent;
  let fixture: ComponentFixture<TravelAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
