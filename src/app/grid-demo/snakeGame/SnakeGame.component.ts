//this is inspration from: https://www.geeksforgeeks.org/angular-js/snake-game-using-angular/

import { Component, ViewChild, ElementRef, AfterViewInit, Inject, PLATFORM_ID, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-snake-game',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './SnakeGame.component.html',
    styleUrl: '../../../styles.css'
})
export class SnakeGameComponent implements AfterViewInit, OnDestroy {
    isGameOverModalOpen: boolean = false;

    score: number = 0;

    @ViewChild("screen", { static: true })
    canvas!: ElementRef<HTMLCanvasElement>;

    private gameLoopId: any;
    private changeDirectionHandler: ((event: KeyboardEvent) => void) | undefined;

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private cdr: ChangeDetectorRef
    ) { }

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

    startGame() {
        this.isGameOverModalOpen = false;
        this.score = 0;
        if (this.gameLoopId) { clearInterval(this.gameLoopId); }
        let ctx = this.canvas.nativeElement.getContext('2d');
        if (!ctx) return;

        let gameOver: boolean = false;
        let snake = [{ x: 20 * 4, y: 0 }, { x: 20 * 3, y: 0 }, { x: 20 * 2, y: 0 }, { x: 20, y: 0 }, { x: 0, y: 0 }];
        let xVelocity: number = 20;
        let yVelocity: number = 0;
        let foodX: number;
        let foodY: number;

        this.score = 0;

        function checkGameOver() {
            if (snake[0].x < 0 || snake[0].x >= 300 || snake[0].y < 0 || snake[0].y >= 150) { gameOver = true; }
            for (let i = 1; i < snake.length; i += 1) { if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) { gameOver = true; } }
        };

        function createFood() {
            do {
                foodX = Math.floor((Math.random() * 13) + 1) * 20;
                foodY = Math.floor((Math.random() * 13) + 1) * 10;
            }
            while (snake.some(part => part.x === foodX && part.y === foodY));
        };

        function drawFood() {
            ctx!.fillStyle = 'red';
            ctx!.fillRect(foodX, foodY, 20, 10);
        };

        function moveSnake() {
            const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
            snake.unshift(head);
        }

        function drawSnake() {
            ctx!.fillStyle = 'black';
            snake.forEach(snakePart => { ctx!.fillRect(snakePart.x, snakePart.y, 20, 10); })
        };

        const changeDirection = (event: KeyboardEvent) => {
            const keyPressed = event.keyCode;

            const LEFT = 65;
            const UP = 87;
            const RIGHT = 68;
            const DOWN = 83;

            const goingUp = (yVelocity === -10);
            const goingDown = (yVelocity === 10);
            const goingRight = (xVelocity === 20);
            const goingLeft = (xVelocity === -20);

            if (keyPressed == LEFT && !goingRight) {
                xVelocity = -20;
                yVelocity = 0;
            }
            else if (keyPressed == UP && !goingDown) {
                xVelocity = 0;
                yVelocity = -10;
            }
            else if (keyPressed == RIGHT && !goingLeft) {
                xVelocity = 20;
                yVelocity = 0;
            }
            else if (keyPressed == DOWN && !goingUp) {
                xVelocity = 0;
                yVelocity = 10;
            }
        };

        if (this.changeDirectionHandler) {
            window.removeEventListener("keydown", this.changeDirectionHandler);
        }
        this.changeDirectionHandler = changeDirection;
        window.addEventListener("keydown", this.changeDirectionHandler);

        createFood();
        this.gameLoopId = setInterval(() => {
            if (!gameOver) {
                checkGameOver();
                ctx!.fillStyle = 'lightgray';
                ctx!.fillRect(0, 0, 400, 400);
                drawFood();
                moveSnake();
                drawSnake();
                if (snake[0].x === foodX && snake[0].y === foodY) {
                    this.score++;
                    this.cdr.detectChanges();
                    createFood();
                }
                else { snake.pop(); }
            }
            else { this.triggerGameOver() }
        }, 250);
    }

    closeModal() {
        // 3. Method called by the "Close" button
        this.isGameOverModalOpen = false;
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