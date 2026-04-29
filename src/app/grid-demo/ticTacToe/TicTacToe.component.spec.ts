import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TicTacToeComponent } from './TicTacToe.component';

describe('TicTacToeComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({ imports: [RouterTestingModule], declarations: [TicTacToeComponent], }).compileComponents();
  }));

  it('should create the TicTacToe', () => {
    const fixture = TestBed.createComponent(TicTacToeComponent);
    const TicTacToe = fixture.debugElement.componentInstance;
    expect(TicTacToe).toBeTruthy();
  });

  it(`should have as title 'myTicTacToe'`, () => {
    const fixture = TestBed.createComponent(TicTacToeComponent);
    const TicTacToe = fixture.debugElement.componentInstance;
    expect(TicTacToe.title).toEqual('myTicTacToe');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(TicTacToeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('myTicTacToe TicTacToe is running!');
  });
});
