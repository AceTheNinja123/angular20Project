import { Component, Input, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { Tile } from '@app/tetris/interface/tile/tile';

@Component({
  selector: 't-tile',
  standalone: true,
  template: ``,
  styleUrls: ['./tile.component.scss', '../../../tetris/styles/tetris.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileComponent {
  @Input() tile!: Tile;
  @HostBinding('class.filled') get isFilled() { return this.tile?.isFilled; }
  @HostBinding('class.animated') get isAnimated() { return this.tile?.isAnimated; }
}
