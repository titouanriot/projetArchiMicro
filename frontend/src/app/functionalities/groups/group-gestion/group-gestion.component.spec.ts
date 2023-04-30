import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupGestionComponent } from './group-gestion.component';

describe('GroupGestionComponent', () => {
  let component: GroupGestionComponent;
  let fixture: ComponentFixture<GroupGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupGestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
