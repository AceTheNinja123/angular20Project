import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// this took inspiration from https://www.geeksforgeeks.org/angular-js/how-to-create-todo-list-in-angular-7/
@Component({
    selector: 'app-to-do-list',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './ToDoList.component.html',
    styleUrl: '../../../styles.css'
})
export class ToDoList {
    /* An empty array that is responsible to add a division */
    public items: string[] = [];

    /* A two-way binding performed which pushes text on division */
    public newTask: string = '';

    /* When input is empty, it will not create a new division */
    public addToList() {
        if (this.newTask == '') { }
        else {
            this.items.push(this.newTask);
            this.newTask = '';
        }
    }

    /* This function takes to input the task, that has to be deleted*/
    public deleteTask(index: number) { this.items.splice(index, 1); }
}