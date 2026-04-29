import { TetrisStateService } from '@app/tetris/state/tetris/tetris.state';
import { AsyncPipe } from '@angular/common';
import { Component, inject, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { timer } from 'rxjs';
import { NumberComponent } from '../number/number.component';

const REFRESH_LABEL_INTERVAL = 3000;
@UntilDestroy()
@Component({
  selector: 't-point',
  standalone: true,
  imports: [NumberComponent,],
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss']
})
export class PointComponent {
  private tetrisState = inject(TetrisStateService);

  // Create a signal from the timer to handle the "Max/Score" jumping when idle
  private readonly tick = toSignal(timer(0, REFRESH_LABEL_INTERVAL), { initialValue: 0 });

  // Use computed to automatically react to signal changes (points, max, and game state)
  protected readonly info = computed(() => {
    const points = this.tetrisState.points();
    const max = this.tetrisState.max();
    const isPlaying = !!this.tetrisState.current(); // Use signal access if current is a signal

    if (isPlaying) {
      return { label: 'Score', points };
    }

    // Idle state: cycle every 3 seconds
    const isScoreCycle = (this.tick() ?? 0) % 2 === 0;
    return isScoreCycle ? { label: 'Score', points } : { label: 'Max ', points: max };
  });
}

class LabelAndNumber { constructor(public label: string, public points: number) { } }
