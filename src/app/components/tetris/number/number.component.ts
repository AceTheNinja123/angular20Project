import { NgClass, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 't-number',
  standalone: true,
  templateUrl: './number.component.html',
  styleUrls: ['../../../tetris/styles/tetris.scss', '../../../tetris/styles/tetris.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
// C:\Users\Abby\Documents\angular20Project\src\app\tetris\styles\_util.scss
export class NumberComponent {
  @Input() num = 0;
  @Input() length = 6;

  get nums(): string[] {
    const str = `${this.num}`;
    return str.padStart(this.length, 'n').split('');
  }
}
