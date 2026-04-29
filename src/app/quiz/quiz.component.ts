// quiz-component.ts

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-quiz',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatRadioModule,
        MatButtonModule,
        CommonModule
    ],
    standalone: true,
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.css'],

})
export class QuizComponent implements OnInit {
    qBank = [
        { id: 1, question: "Which element is most commonly associated with dragons in Western mythology?", options: ["Water", "Fire", "Earth", "Air"], answer: "Fire", selected: '', correct: false },
        { id: 2, question: "What is the name of the dragon defeated by Saint George?", options: ["Fafnir", "The Lambton Worm", "The Dragon of Silene", "Smaug"], answer: "The Dragon of Silene", selected: '', correct: false },
        { id: 3, question: "In Norse mythology, who killed the dragon Fafnir?", options: ["Thor", "Odin", "Sigurd", "Loki"], answer: "Sigurd", selected: '', correct: false },
        { id: 4, question: "In Chinese mythology, dragons are primarily associated with which natural force?", options: ["Fire", "Wind", "Rain", "Lightning"], answer: "Rain", selected: '', correct: false },
        { id: 5, question: "What is the name of Bilbo Baggins’ dragon adversary in The Hobbit?", options: ["Drogon", "Viserion", "Smaug", "Toothless"], answer: "Smaug", selected: '', correct: false },
        { id: 6, question: "Which dragon is one of Daenerys Targaryen’s dragons in Game of Thrones?", options: ["Norbert", "Drogon", "Saphira", "Falkor"], answer: "Drogon", selected: '', correct: false },
        { id: 7, question: "What ability do many dragons in fantasy stories commonly have?", options: ["Invisibility", "Time travel", "Breathing fire", "Shape-shifting into wolves"], answer: "Breathing fire", selected: '', correct: false },
        { id: 8, question: "In medieval legends, what do dragons often guard?", options: ["Ancient forests", "Golden treasure", "Magic swords", "Sacred temples"], answer: "Golden treasure", selected: '', correct: false }
    ];

    quizForm: FormGroup;
    score: number = 0;
    showResults: boolean = false;

    constructor(private fb: FormBuilder) { this.quizForm = this.fb.group({}); }

    ngOnInit() { this.qBank.forEach(q => { this.quizForm.addControl(q.id.toString(), new FormControl('')); }); }

    onSubmit() {
        this.score = 0;
        this.qBank.forEach(q => {
            const controlValue = this.quizForm.get(q.id.toString())?.value;
            q.selected = controlValue;
            if (controlValue === q.answer) {
                q.correct = true;
                this.score++;
            }
            else { q.correct = false; }
        });

        this.showResults = true;
    }
}