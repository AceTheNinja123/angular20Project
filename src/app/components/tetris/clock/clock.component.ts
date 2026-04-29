import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, timer } from 'rxjs';

const REFRESH_CLOCK_INTERVAL = 1000;
@Component({
  selector: 't-clock',
  standalone: true,
  imports: [ AsyncPipe, CommonModule],
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss', '../../../tetris/styles/tetris.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClockComponent {
  clock$ = timer(0, REFRESH_CLOCK_INTERVAL).pipe(map(() => this.renderClock()));

  renderClock(): string[] {
    const now = new Date();
    const hours = this.formatTwoDigits(now.getHours());
    const minutes = this.formatTwoDigits(now.getMinutes());
    const isOddSecond = now.getSeconds() % 2 !== 0;
    const blinking = `colon-${isOddSecond ? 'solid' : 'faded'}`;
    return [...hours, blinking, ...minutes];
  }

  formatTwoDigits(num: number): string[] { return `${num}`.padStart(2, '0').split(''); }
}
