import { TetrisStateService } from '@app/tetris/state/tetris/tetris.state';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

@Component({
  selector: 't-sound',
  standalone: true,
  templateUrl: './sound.component.html',
  styleUrls: ['./sound.component.scss', '../../../tetris/styles/tetris.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SoundComponent {
  private tetrisState = inject(TetrisStateService);
  muted = computed(() => !this.tetrisState.isEnableSound());
}
