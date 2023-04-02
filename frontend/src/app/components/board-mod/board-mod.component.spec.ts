import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardModComponent } from './board-mod.component';

describe('BoardModComponent', () => {
  let component: BoardModComponent;
  let fixture: ComponentFixture<BoardModComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardModComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
