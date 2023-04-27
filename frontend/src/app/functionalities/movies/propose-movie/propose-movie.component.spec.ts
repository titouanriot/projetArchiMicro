import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposeMovieComponent } from './propose-movie.component';

describe('ProposeMovieComponent', () => {
  let component: ProposeMovieComponent;
  let fixture: ComponentFixture<ProposeMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProposeMovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposeMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
