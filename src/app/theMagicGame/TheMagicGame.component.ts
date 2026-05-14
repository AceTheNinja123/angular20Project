import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface magicData {
    number: number;
    emoji: string;
}

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; @Component({
    selector: 'app-the-magic-game',
    standalone: true,
    templateUrl: './TheMagicGame.component.html',
    imports: [FormsModule, CommonModule, HttpClientModule, FontAwesomeModule],
})
export class TheMagicGameComponent {
    protected readonly instructions: string[] = [
        "Remember a two digit number. (Example: 13)",
        "Calculate the sum of the digits. (1 + 3 = 4)",
        "Subtract the sum from the original number. (13 - 4 = 9)",
        "Note the icon",
        "Click the Reveal button at the bottom to see the Magic!",
    ];
    public emojis = ["😭", "✨", "🔥", "🫠", "💀", "✅", "💗", "🥀", "👀", "🖤"]
    public magicData: magicData[] = [];
    public reveal: boolean = false;
    public answer: string = '';
    constructor(private http: HttpClient, private cd: ChangeDetectorRef) { this.inizilezetion(); }

    inizilezetion() {
        let sum = 0;
        this.magicData = [];
        for (let i = 0; i < 99; i++) {
            this.magicData.push({ number: sum, emoji: this.getEmoji(), });
            sum++;
        }
        this.answer = this.getEmoji();
    }

    getEmoji() { return this.emojis[Math.floor(Math.random() * this.emojis.length)]; }

    revealResults(): void { this.reveal = true; }
}