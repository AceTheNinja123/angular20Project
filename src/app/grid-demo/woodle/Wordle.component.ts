import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

interface cell {
    letter: string;
    color: string;
}
const maxGuesses = 6;

@Component({
    selector: 'app-wordle',
    standalone: true,
    imports: [FormsModule, CommonModule, FontAwesomeModule],
    templateUrl: './Wordle.component.html',
    styleUrl: '../../../styles.css'
})
export class WordleComponent {
    protected readonly row1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',];
    protected readonly row2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    protected readonly row3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];
    protected readonly deleteIcon = faDeleteLeft;
    protected readonly targetWord = signal<string>('APPLE');
    public wordCount = 5;
    public guesses: cell[][] = [];
    public history: { [key: string]: { color: string } } = {};
    public currentGuessRow = 0;
    public currentGuessCol = 0;
    public message = '';
    constructor() {
        for (let j = 0; j < maxGuesses; j++) {
            const row: cell[] = [];
            for (let i = 0; i < this.wordCount; i++) {
                row.push({ color: '', letter: '' });
            }
            this.guesses.push(row);
        }
    }

    protected addLetter(letter: string): void {
        if (this.currentGuessCol >= this.wordCount) {
            return;
        }
        this.guesses[this.currentGuessRow][this.currentGuessCol].letter = letter;
        this.currentGuessCol++;
    }

    protected deleteLetter(): void {
        this.currentGuessCol = Math.max(this.currentGuessCol - 1, 0);
        this.guesses[this.currentGuessRow][this.currentGuessCol].letter = '';

    }

    protected async enterWord(): Promise<void> {
        if (this.currentGuessCol !== this.wordCount) {
            this.message = 'Not enough letters!';
            return;
        }
        this.message = '';
        const targetArr = this.targetWord().toUpperCase().split('');
        const rowGuess = this.guesses[this.currentGuessRow]
        const wordString = rowGuess.map(cell => cell.letter).join('').toUpperCase();

        if (!(await this.isValidWord(wordString))) {
            return;
        }

        for (let i = 0; i < this.wordCount; i++) {
            const letter = this.guesses[this.currentGuessRow][i].letter.toUpperCase();
            if (targetArr.includes(letter)) {
                if (letter === targetArr[i]) {
                    this.guesses[this.currentGuessRow][i].color = 'green';
                    targetArr[i] = ''; // Mark letter as used
                    this.history[letter] = {color:'green'};
                } else {
                    this.guesses[this.currentGuessRow][i].color = 'yellow';
                    if (!this.history[letter]) {
                        this.history[letter] = {color: 'yellow'};
                    }
                }
            } else {
                this.guesses[this.currentGuessRow][i].color = 'grey';
                if (!this.history[letter]) {
                    this.history[letter] = {color: 'grey'};
                }
            }
        }
        console.log(this.history);
        if (wordString === this.targetWord()) {
            this.message = 'Congratulations! You guessed the word!';
            return;
        }

        this.currentGuessRow++;
        this.currentGuessCol = 0;
    }

    protected async isValidWord(word: string): Promise<boolean> {
        // try {
        //     const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);
        //     if (response.ok) { return true; }
        //     this.message = 'Not a valid word!';
        //     return false;
        // } catch (error) {
        //     this.message = 'Not a valid word!';
        //     return false;
        // }
        return true; // Placeholder for word validation logic
    }

    protected resetGame(): void {
        this.currentGuessRow = 0;
        this.currentGuessCol = 0;
        this.message = '';
        for (let j = 0; j < maxGuesses; j++) {
            for (let i = 0; i < this.wordCount; i++) {
                this.guesses[j][i] = { color: '', letter: '' };
            }
        }
        this.history = {};
    }

}