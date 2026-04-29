
import { Component, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faChess, faChessBoard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@Component({
    selector: 'app-chess',
    templateUrl: './Chess.component.html',
    styleUrls: ['./Chess.component.css'],
    standalone: true,
    imports: [CommonModule, FontAwesomeModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChessComponent {
    // FontAwesome icon
    faChess = faChess;
    faChessBoard = faChessBoard;

    // Chess clocks (in seconds)
    whiteTime = signal<number>(300);
    blackTime = signal<number>(300);
    timerInterval: any = null;
    // Game status
    status = signal<string>('');
    gameOver = signal<boolean>(false);
    // Standardizing to null for empty squares
    board = signal<string[][]>([
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
        ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
        [null!, null!, null!, null!, null!, null!, null!, null!],
        [null!, null!, null!, null!, null!, null!, null!, null!],
        [null!, null!, null!, null!, null!, null!, null!, null!],
        [null!, null!, null!, null!, null!, null!, null!, null!],
        ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
    ]);

    selected = signal<{ row: number, col: number } | null>(null);
    turn = signal<'w' | 'b'>('w');

    // Track captured pieces
    capturedWhite = signal<string[]>([]); // pieces captured from white (by black)
    capturedBlack = signal<string[]>([]); // pieces captured from black (by white)

    // Track if the game has started
    started = signal<boolean>(false);
    ngOnInit() { }

    startTimer() {
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => {
            if (this.gameOver() || this.paused()) return;
            if (this.turn() === 'w') {
                if (this.whiteTime() <= 0) {
                    this.status.set('White ran out of time! Black wins!');
                    this.gameOver.set(true);
                } else { this.whiteTime.set(this.whiteTime() - 1); }
            } else {
                if (this.blackTime() <= 0) {
                    this.status.set('Black ran out of time! White wins!');
                    this.gameOver.set(true);
                } else { this.blackTime.set(this.blackTime() - 1); }
            }
        }, 1000);
    }

    // Returns true if the given color is checkmated
    isCheckmate(color: 'w' | 'b', board: string[][]): boolean {
        if (!this.isKingInCheck(color, board)) return false;
        // If no legal moves for this color, it's checkmate
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const piece = board[r][c];
                if (piece && piece[0] === color) {
                    const moves = this.getLegalMoves(r, c, piece, board);
                    if (moves.length > 0) return false;
                }
            }
        }
        return true;
    }
    // Clean up timer on destroy
    ngOnDestroy() { if (this.timerInterval) clearInterval(this.timerInterval); }

    // Returns true if the given color's king is in check
    isKingInCheck(color: 'w' | 'b', board: string[][]): boolean {
        // Find king
        let kingPos = { r: -1, c: -1 };
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                if (board[r][c] === color + 'K') {
                    kingPos = { r, c };
                    break;
                }
            }
        }
        if (kingPos.r === -1) return false;
        const opponent = color === 'w' ? 'b' : 'w';
        return this.isSquareUnderAttack(kingPos.r, kingPos.c, opponent, board);
    }
    paused = signal<boolean>(false);
    pauseGame() { this.paused.set(true); }
    resumeGame() { this.paused.set(false); }

    initialBoard(): string[][] {
        return [
            ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
            ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
            [null!, null!, null!, null!, null!, null!, null!, null!],
            [null!, null!, null!, null!, null!, null!, null!, null!],
            [null!, null!, null!, null!, null!, null!, null!, null!],
            [null!, null!, null!, null!, null!, null!, null!, null!],
            ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
            ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
        ];
    }

    pieceIcon: Record<string, string> = {
        wK: 'WhiteKing.svg', wQ: 'WhiteQueen.svg', wR: 'WhiteRook.svg',
        wB: 'WhiteBishop.svg', wN: 'WhiteKnight.svg', wP: 'WhitePawn.svg',
        bK: 'BlackKing.svg', bQ: 'BlackQueen.svg', bR: 'BlackRook.svg',
        bB: 'BlackBishop.svg', bN: 'BlackKnight.svg', bP: 'BlackPawn.svg',
    };

    // Add these to your ChessComponent class
    isPromoting = signal<{ row: number, col: number, color: 'w' | 'b' } | null>(null);

    promotionPieces = computed(() => {
        const pending = this.isPromoting();
        if (!pending) return [];
        const color = pending.color;
        return [
            { type: 'Q', icon: this.pieceIcon[color + 'Q'] },
            { type: 'R', icon: this.pieceIcon[color + 'R'] },
            { type: 'B', icon: this.pieceIcon[color + 'B'] },
            { type: 'N', icon: this.pieceIcon[color + 'N'] }
        ];
    });

    promote(pieceType: string) {
        const pending = this.isPromoting();
        const selected = this.selected();
        if (!pending || !selected) return;

        const newBoard = this.board().map(r => [...r]);
        newBoard[pending.row][pending.col] = pending.color + pieceType;
        newBoard[selected.row][selected.col] = null!;

        this.board.set(newBoard);
        this.isPromoting.set(null);
        this.selected.set(null);
        this.turn.set(this.turn() === 'w' ? 'b' : 'w');
    }

    getLegalMoves(row: number, col: number, piece: string, board: string[][], checkCheck = true): { row: number, col: number }[] {
        let moves: { row: number, col: number }[] = [];
        const color = piece[0];
        const type = piece[1];
        const opponent = color === 'w' ? 'b' : 'w';
        function inBounds(r: number, c: number) { return r >= 0 && r < 8 && c >= 0 && c < 8; }
        if (type === 'P') {
            // Pawn
            const dir = color === 'w' ? -1 : 1;
            // Forward
            if (inBounds(row + dir, col) && !board[row + dir][col]) {
                moves.push({ row: row + dir, col });
                // Double move from start
                if ((color === 'w' && row === 6) || (color === 'b' && row === 1)) {
                    if (!board[row + 2 * dir][col]) { moves.push({ row: row + 2 * dir, col }); }
                }
            }
            // Captures
            for (const dc of [-1, 1]) {
                const r = row + dir, c = col + dc;
                if (inBounds(r, c) && board[r][c] && board[r][c][0] === opponent) { moves.push({ row: r, col: c }); }
            }
        } else if (type === 'N') {
            // Knight
            for (const [dr, dc] of [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]]) {
                const r = row + dr, c = col + dc;
                if (inBounds(r, c) && (!board[r][c] || board[r][c][0] === opponent)) { moves.push({ row: r, col: c }); }
            }
        } else if (type === 'B' || type === 'R' || type === 'Q') {
            // Bishop, Rook, Queen
            const directions: [number, number][] = [];
            if (type === 'B' || type === 'Q') directions.push([-1, -1], [-1, 1], [1, -1], [1, 1]);
            if (type === 'R' || type === 'Q') directions.push([-1, 0], [1, 0], [0, -1], [0, 1]);
            for (const [dr, dc] of directions) {
                let r = row + dr, c = col + dc;
                while (inBounds(r, c)) {
                    if (!board[r][c]) { moves.push({ row: r, col: c }); }
                    else {
                        if (board[r][c][0] === opponent) moves.push({ row: r, col: c });
                        break;
                    }
                    r += dr; c += dc;
                }
            }
        } else if (type === 'K') {
            // King
            for (const [dr, dc] of [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]) {
                const r = row + dr, c = col + dc;
                if (inBounds(r, c) && (!board[r][c] || board[r][c][0] === opponent)) { moves.push({ row: r, col: c }); }
            }
        }
        if (checkCheck) {
            // Filter moves: only keep moves that don't leave the King in check
            return moves.filter(move => {
                const tempBoard = board.map(r => [...r]);
                // Simulate the move
                tempBoard[move.row][move.col] = piece;
                tempBoard[row][col] = null!;
                // Find the King
                let kingPos = { r: -1, c: -1 };
                for (let r = 0; r < 8; r++) {
                    for (let c = 0; c < 8; c++) {
                        if (tempBoard[r][c] === color + 'K') {
                            kingPos = { r, c };
                            break;
                        }
                    }
                }
                // If the King's position is under attack after this move, it's illegal
                return !this.isSquareUnderAttack(kingPos.r, kingPos.c, opponent, tempBoard);
            });
        }
        return moves;
    }

    isSquareUnderAttack(row: number, col: number, attackerColor: 'w' | 'b', board: string[][]): boolean {
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const piece = board[r][c];
                if (piece && piece[0] === attackerColor) {
                    // Get all potential moves for this piece
                    const moves = this.getLegalMoves(r, c, piece, board, false);
                    if (moves.some(m => m.row === row && m.col === col)) { return true; }
                }
            }
        }
        return false;
    }

    possibleMoves = computed(() => {
        const sel = this.selected();
        if (!sel) return [];
        const board = this.board();
        const piece = board[sel.row][sel.col];
        if (!piece) return [];
        return this.getLegalMoves(sel.row, sel.col, piece, board);
    });

    // Check/checkmate/stalemate/draw detection
    updateGameStatus() {
        const board = this.board();
        const turn = this.turn();
        if (this.isKingInCheck(turn, board)) {
            // Is it checkmate?
            if (this.isCheckmate(turn, board)) {
                this.status.set((turn === 'w' ? 'White' : 'Black') + ' is checkmated! ' + (turn === 'w' ? 'Black' : 'White') + ' wins!');
                this.gameOver.set(true);
                return;
            } else {
                this.status.set((turn === 'w' ? 'White' : 'Black') + ' is in check!');
                this.gameOver.set(false);
                return;
            }
        }
        // Stalemate: not in check, but no legal moves
        if (this.isStalemate(turn, board)) {
            this.status.set('Stalemate! Draw.');
            this.gameOver.set(true);
            return;
        }
        // TODO: Add more draw conditions if desired
        this.status.set('');
    }

    startGame() {
        this.board.set(this.initialBoard());
        this.selected.set(null);
        this.turn.set('w');
        this.capturedWhite.set([]);
        this.capturedBlack.set([]);
        this.status.set('');
        this.gameOver.set(false);
        this.whiteTime.set(300);
        this.blackTime.set(300);
        this.started.set(true);
        this.startTimer();
    }

    restartGame() { this.startGame(); }

    isStalemate(color: 'w' | 'b', board: string[][]): boolean {
        if (this.isKingInCheck(color, board)) return false;
        // If no legal moves for this color, it's stalemate
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const piece = board[r][c];
                if (piece && piece[0] === color) {
                    const moves = this.getLegalMoves(r, c, piece, board);
                    if (moves.length > 0) return false;
                }
            }
        }
        return true;
    }

    executeMove(fromRow: number, fromCol: number, toRow: number, toCol: number) {
        // Restart timer for new turn
        this.startTimer();
        const board = this.board();
        const fromPiece = board[fromRow][fromCol];
        const toPiece = board[toRow][toCol];

        // 1. Create a deep copy of the board to trigger Angular's change detection
        const newBoard = board.map(r => [...r]);

        // 2. Place the piece in the new spot and clear the old spot
        newBoard[toRow][toCol] = fromPiece;
        newBoard[fromRow][fromCol] = null!;

        // 3. If a piece was captured, add to captured list
        if (toPiece) {
            if (toPiece[0] === 'w') { this.capturedWhite.set([...this.capturedWhite(), toPiece]); }
            else { this.capturedBlack.set([...this.capturedBlack(), toPiece]); }
        }

        // 4. Update the signal state
        this.board.set(newBoard);
        this.selected.set(null);

        // 5. Switch the turn
        const nextTurn = this.turn() === 'w' ? 'b' : 'w';
        this.turn.set(nextTurn);

        // 6. Check for check, checkmate, stalemate, or draw
        this.updateGameStatus();
    }

    onCellClick(row: number, col: number) {
        if (this.gameOver()) return;
        const board = this.board();
        const selected = this.selected();
        const cell = board[row][col];
        const currentTurn = this.turn();

        // 1. Handle selection
        if (cell && cell[0] === currentTurn) {
            this.selected.set({ row, col });
            return;
        }

        // 2. Handle move execution
        if (selected) {
            const fromPiece = board[selected.row][selected.col];
            const moves = this.getLegalMoves(selected.row, selected.col, fromPiece, board);
            const isLegal = moves.some(m => m.row === row && m.col === col);

            if (isLegal) {
                const isPawn = fromPiece[1] === 'P';
                const isLastRank = (currentTurn === 'w' && row === 0) || (currentTurn === 'b' && row === 7);

                if (isPawn && isLastRank) {
                    // If it's promotion, don't move yet! Show the modal.
                    this.isPromoting.set({ row, col, color: currentTurn });
                    return;
                }

                // If it's a normal move, use our helper
                this.executeMove(selected.row, selected.col, row, col);
            } else { this.selected.set(null); }
        }
    }
}