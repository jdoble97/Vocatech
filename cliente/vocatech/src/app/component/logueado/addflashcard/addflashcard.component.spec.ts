import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddflashcardComponent } from './addflashcard.component';

describe('AddflashcardComponent', () => {
  let component: AddflashcardComponent;
  let fixture: ComponentFixture<AddflashcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddflashcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddflashcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
