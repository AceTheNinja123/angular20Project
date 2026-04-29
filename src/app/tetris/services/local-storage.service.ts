const ANGULAR_TETRIS_STORAGE_KEY = 'ANGULAR_TETRIS';
export class LocalStorageService {
  constructor() { }

  static setMaxPoint(max: number) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(ANGULAR_TETRIS_STORAGE_KEY, `${max}`);
    }
  }

  static get maxPoint(): number {
    if (typeof localStorage === 'undefined') return 0;
    const max = parseInt(localStorage.getItem(ANGULAR_TETRIS_STORAGE_KEY) || '0');
    return Number.isInteger(max) ? max : 0;
  }
}
