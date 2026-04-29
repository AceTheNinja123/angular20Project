import { Component, ViewChild, ElementRef, AfterViewInit, Inject, PLATFORM_ID, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { faHand, faHandScissors, faHandBackFist } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'app-rock-paper-scissors-game',
    standalone: true,
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './RockPaperScissorsGame.component.html',
    styleUrl: '../../../styles.css'
})
export class RockPaperScissorsGameComponent implements AfterViewInit, OnDestroy {
    // Game variables
    isGameOverModalOpen: boolean = false;
    isGameStarted: boolean = false;
    isRestart: boolean = false;
    maxScore: number = 5;
    score1: number = 0;
    score2: number = 0;
    player1Icon = faHand;
    player2Icon = faHand;
    winner: string = '';
    // Icons for moves
    faRock = faHandBackFist;
    faPaper = faHand;
    faScissors = faHandScissors;

    @ViewChild("screen", { static: true })
    canvas!: ElementRef<HTMLCanvasElement>;

    private gameLoopId: any;
    private changeDirectionHandler: ((event: KeyboardEvent) => void) | undefined;

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private cdr: ChangeDetectorRef
    ) { }
    // Initialize the canvas and draw the initial "Press Start" message
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            const ctx = this.canvas.nativeElement.getContext('2d');
            if (ctx) {
                ctx.fillStyle = 'white';
                ctx.font = '20px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('Press Start', 150, 75);
            }
        }
    }
    // Determine the winner of a round
    determineWinner(player1Move: string, player2Move: string) {
        if (player1Move === player2Move) { return 0; }
        else if ((player1Move === 'rock' && player2Move === 'scissors') ||
            (player1Move === 'paper' && player2Move === 'rock') ||
            (player1Move === 'scissors' && player2Move === 'paper')) {
            return 1;
        } else { return 2; }
    }
    // Start the game and initialize scores and icons
    startGame() {
        this.isGameStarted = true;
        this.score1 = 0;
        this.score2 = 0;
        this.player1Icon = faHand;
        this.player2Icon = faHand;
        this.winner = '';
        this.gameLoopId = setInterval(() => {
            if (this.score1 >= this.maxScore || this.score2 >= this.maxScore) {
                this.winner = this.score1 > this.score2 ? 'Player 1' : 'Player 2';
                this.triggerGameOver();
            }
        }, 100);
    }
    // Handle player's move, randomly generate opponent's move, update icons and scores, and check for game over condition
    handlePlayerMove(player: number, move: string) {
        if (!this.isGameStarted) return;
        const moves = ['rock', 'paper', 'scissors'];
        const player1Move = player === 1 ? move : moves[Math.floor(Math.random() * 3)];
        const player2Move = player === 2 ? move : moves[Math.floor(Math.random() * 3)];

        // Map moves to icons
        const iconMap: { [key: string]: any } = {
            'rock': faHandBackFist,
            'paper': faHand,
            'scissors': faHandScissors
        };

        this.player1Icon = iconMap[player1Move];
        this.player2Icon = iconMap[player2Move];

        const result = this.determineWinner(player1Move, player2Move);
        if (result === 1) { this.score1++; }
        else if (result === 2) { this.score2++; }

        this.gameLoopId = setInterval(() => {
            if (this.score1 >= this.maxScore || this.score2 >= this.maxScore) {
                this.winner = this.score1 > this.score2 ? 'Player 1' : 'Player 2';
                this.triggerGameOver();
            }
        }, 250);
    }
    // Reset the game state and close the game over modal
    closeModal() {
        // 3. Method called by the "Close" button
        this.isGameOverModalOpen = false;
        this.isGameStarted = false;
        this.score1 = 0;
        this.score2 = 0;
        this.player1Icon = faHand;
        this.player2Icon = faHand;
        this.winner = '';

        this.cdr.detectChanges();
    }

    // Call this method when your game logic detects a collision
    triggerGameOver() {
        this.isGameOverModalOpen = true;
        clearInterval(this.gameLoopId);
        this.cdr.detectChanges();
    }

    ngOnDestroy() {
        clearInterval(this.gameLoopId);
        if (this.changeDirectionHandler) { window.removeEventListener("keydown", this.changeDirectionHandler); }
    }
}