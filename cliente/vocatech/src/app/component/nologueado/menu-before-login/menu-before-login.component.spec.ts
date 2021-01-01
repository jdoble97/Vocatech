import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBeforeLoginComponent } from './menu-before-login.component';

describe('MenuBeforeLoginComponent', () => {
  let component: MenuBeforeLoginComponent;
  let fixture: ComponentFixture<MenuBeforeLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuBeforeLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBeforeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
