import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Erreur404Component } from './erreur404.component';

describe('Erreur404Component', () => {
  let component: Erreur404Component;
  let fixture: ComponentFixture<Erreur404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Erreur404Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Erreur404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
