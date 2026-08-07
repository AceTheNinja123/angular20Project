import { ClockComponent } from '@components/tetris/clock/clock.component';
import { HoldComponent } from '@components/tetris/hold/hold.component';
import { KeyboardComponent } from '@components/tetris/keyboard/keyboard.component';
import { LevelComponent } from '@components/tetris/level/level.component';
import { LogoComponent } from '@components/tetris/logo/logo.component';
import { MatrixComponent } from '@components/tetris/matrix/matrix.component';
import { NextComponent } from '@components/tetris/next/next.component';
import { PauseComponent } from '@components/tetris/pause/pause.component';
import { PointComponent } from '@components/tetris/point/point.component';
import { ScreenDecorationComponent } from '@components/tetris/screen-decoration/screen-decoration.component';
import { SoundComponent } from '@components/tetris/sound/sound.component';
import { StartLineComponent } from '@components/tetris/start-line/start-line.component';
import { TetrisKeyboard } from './interface/keyboard';
import { SoundManagerService } from './services/sound-manager.service';
import { KeyboardService } from './state/keyboard/keyboard.service';
import { TetrisService } from './state/tetris/tetris.service';
import { TetrisStateService } from './state/tetris/tetris.state';
import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, Renderer2, inject, PLATFORM_ID } from '@angular/core';

const KeyUp = 'document:keyup';
const KeyDown = 'document:keydown';
@Component({
  selector: 'app-tetris', // eslint-disable-line @angular-eslint/component-selector
  standalone: true,
  imports: [
    AsyncPipe, ClockComponent, HoldComponent,
    KeyboardComponent, LevelComponent, LogoComponent,
    MatrixComponent, NextComponent, PauseComponent,
    PointComponent, ScreenDecorationComponent, SoundComponent,
    StartLineComponent
  ],
  templateUrl: './Tetris.component.html',
  styleUrls: ['./Tetris.component.css', '../tetris/styles/tetris.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:resize)': 'resize($event)',
    '(window:beforeunload)': 'unloadHandler($event)',
    '(document:keydown.arrowleft)': 'keyDownLeft($event)',
    '(document:keyup.arrowleft)': 'keyUpLeft($event)',
    '(document:keydown.arrowright)': 'keyDownRight($event)',
    '(document:keyup.arrowright)': 'keyUpRight($event)',
    '(document:keydown.arrowup)': 'keyDownUp($event)',
    '(document:keyup.arrowup)': 'keyUpUp($event)',
    '(document:keydown.arrowdown)': 'keyDownDown($event)',
    '(document:keyup.arrowdown)': 'keyUpDown($event)',
    '(document:keydown.space)': 'keyDownSpace($event)',
    '(document:keyup.space)': 'keyUpSpace($event)',
    '(document:keydown.c)': 'keyDownHold($event)',
    '(document:keyup.c)': 'keyUpHold($event)',
    '(document:keydown.s)': 'keyDownSound($event)',
    '(document:keyup.s)': 'keyUpSound($event)',
    '(document:keydown.p)': 'keyDownPause($event)',
    '(document:keyup.p)': 'keyUpPause($event)',
    '(document:keydown.r)': 'keyDownReset($event)',
    '(document:keyup.r)': 'keyUpReset($event)'
  }
})
export class TetrisComponent implements OnInit {
  private tetrisState = inject(TetrisStateService);
  private tetrisService = inject(TetrisService);
  private keyboardService = inject(KeyboardService);
  private soundManager = inject(SoundManagerService);
  private el = inject(ElementRef);
  private render = inject(Renderer2);
  private platformId = inject(PLATFORM_ID);

  drop = this.keyboardService.drop;
  isShowLogo$ = this.tetrisState.isShowLogo$;
  filling!: number;
  // small preview arrays (4x4 flattened)
  nextCells: boolean[] = Array(16).fill(false);
  holdCells: boolean[] = Array(16).fill(false);

  get points() { return this.tetrisState.points(); }
  get lines() { return this.tetrisState.clearedLines(); }

  resize(event?: Event) {
    if (isPlatformBrowser(this.platformId)) {
      const width = document.documentElement.clientWidth;
      const height = document.documentElement.clientHeight;
      const ratio = height / width;
      let scale = 1;
      if (ratio < 1.5) { scale = height / 960; }
      else {
        scale = width / 640;
        this.filling = (height - 960 * scale) / scale / 3;
        const paddingTop = Math.floor(this.filling) + 42;
        const paddingBottom = Math.floor(this.filling);
        const marginTop = Math.floor(-480 - this.filling * 1.5);
        this.setPaddingMargin(paddingTop, paddingBottom, marginTop);
      }
      this.render.setStyle(this.el.nativeElement, 'transform', `scale(${scale - 0.01})`);
    }
  }

  unloadHandler(event: Event) {
    if (this.hasCurrent) {
      event.preventDefault();
      event.returnValue = true;
    }
  }

  keyDownLeft(event?: Event) {
    event?.preventDefault();
    this.soundManager.move();
    this.keyboardService.setKeỵ({ left: true });
    if (this.hasCurrent) { this.tetrisService.moveLeft(); }
    else { this.tetrisService.decreaseLevel(); }
  }

  keyUpLeft(event?: Event) { event?.preventDefault(); this.keyboardService.setKeỵ({ left: false }); }

  keyDownRight(event?: Event) {
    event?.preventDefault();
    this.soundManager.move();
    this.keyboardService.setKeỵ({ right: true });
    if (this.hasCurrent) { this.tetrisService.moveRight(); }
    else { this.tetrisService.increaseLevel(); }
  }

  keyUpRight(event?: Event) { event?.preventDefault(); this.keyboardService.setKeỵ({ right: false }); }

  keyDownUp(event?: Event) {
    event?.preventDefault();
    this.soundManager.rotate();
    this.keyboardService.setKeỵ({ up: true });
    if (this.hasCurrent) { this.tetrisService.rotate(); }
    else { this.tetrisService.increaseStartLine(); }
  }

  keyUpUp(event?: Event) { event?.preventDefault(); this.keyboardService.setKeỵ({ up: false }); }

  keyDownDown(event?: Event) {
    event?.preventDefault();
    this.soundManager.move();
    this.keyboardService.setKeỵ({ down: true });
    if (this.hasCurrent) { this.tetrisService.moveDown(); }
    else { this.tetrisService.decreaseStartLine(); }
  }

  keyUpDown(event?: Event) { event?.preventDefault(); this.keyboardService.setKeỵ({ down: false }); }

  keyDownSpace(event?: Event) {
    event?.preventDefault();
    this.keyboardService.setKeỵ({ drop: true });
    if (this.hasCurrent) {
      this.soundManager.fall();
      this.tetrisService.drop();
      return;
    }
    this.soundManager.start();
    this.tetrisService.start();
  }

  keyUpSpace(event?: Event) { event?.preventDefault(); this.keyboardService.setKeỵ({ drop: false }); }

  keyDownHold(event?: Event) { event?.preventDefault(); this.soundManager.move(); this.keyboardService.setKeỵ({ hold: true }); this.tetrisService.holdPiece(); }

  keyUpHold(event?: Event) { event?.preventDefault(); this.keyboardService.setKeỵ({ hold: false }); }

  keyDownSound(event?: Event) { event?.preventDefault(); this.soundManager.move(); this.tetrisService.toggleSound(); this.keyboardService.setKeỵ({ sound: true }); }

  keyUpSound(event?: Event) { event?.preventDefault(); this.keyboardService.setKeỵ({ sound: false }); }

  keyDownPause(event?: Event) { event?.preventDefault(); this.soundManager.move(); this.keyboardService.setKeỵ({ pause: true }); if (this.tetrisState.canStartGame()) { this.tetrisService.resume(); } else { this.tetrisService.pause(); } }

  keyUpPause(event?: Event) { event?.preventDefault(); this.keyboardService.setKeỵ({ pause: false }); }

  keyDownReset(event?: Event) {
    event?.preventDefault();
    this.soundManager.move();
    this.keyboardService.setKeỵ({ reset: true });
    this.tetrisService.pause();
    setTimeout(() => {
      if (confirm('You are having a good game. Are you sure you want to reset?')) { this.tetrisService.reset(); }
      else { this.tetrisService.resume(); }
      this.keyUpReset();
    });
  }

  keyUpReset(event?: Event) { event?.preventDefault(); this.keyboardService.setKeỵ({ reset: false }); }

  get hasCurrent() { return this.tetrisState.hasCurrent(); }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => { this.resize(); });
      // initialize preview arrays
      this.updatePreviewArrays();
    }
  }

  private updatePreviewArrays() {
    try {
      const next = this.tetrisState.next();
      const hold = this.tetrisState.hold();
      this.nextCells = this.pieceToCells(next);
      this.holdCells = this.pieceToCells(hold);
    } catch (e) {
      this.nextCells = Array(16).fill(false);
      this.holdCells = Array(16).fill(false);
    }
  }

  // used by template to get fresh arrays (keeps template simple)
  nextCellsArray() {
    this.updatePreviewArrays();
    return this.nextCells;
  }

  holdCellsArray() {
    this.updatePreviewArrays();
    return this.holdCells;
  }

  private pieceToCells(piece: any) {
    const out: boolean[] = [];
    if (!piece || typeof piece.isNone === 'function' && piece.isNone()) {
      return Array(16).fill(false);
    }
    const shape = piece.shape || piece.next || [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) { out.push(!!(shape[r] && shape[r][c])); }
    }
    return out;
  }

  keyboardMouseDown(key: string) { (this as any)[`keyDown${key}`](); }

  keyboardMouseUp(key: string) { (this as any)[`keyUp${key}`](); }

  private setPaddingMargin(paddingTop: number, paddingBottom: number, marginTop: number) {
    this.render.setStyle(this.el.nativeElement, 'padding-top', `${paddingTop}px`);
    this.render.setStyle(this.el.nativeElement, 'padding-bottom', `${paddingBottom}px`);
    this.render.setStyle(this.el.nativeElement, 'margin-top', `${marginTop}px`);
  }
}
