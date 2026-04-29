import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule } from '@angular/cdk/drag-drop';
// this took inspiration from https://www.geeksforgeeks.org/angular-js/how-to-create-a-to-do-list-using-drag-and-drop-in-angular-7/
@Component({
    selector: 'app-drop-list',
    standalone: true,
    imports: [FormsModule, DragDropModule, CommonModule],
    templateUrl: './DropList.component.html',
    styleUrl: '../../../styles.css'
})
export class DropList {

    // hardcoded lists
    todo = ['Go to gym', 'Eat lunch', 'Take a nap', 'Physics syllabus'];
    done = ['Assignment', 'Coding practice', 'Maths syllabus', 'English syllabus'];

    /* A two-way binding performed which pushes text on division */
    public newTask: string = '';

    /* When input is empty, it will not create a new division */
    public addToList() {
        if (this.newTask == '') { }
        else {
            this.todo.push(this.newTask);
            this.newTask = '';
        }
    }

    //function for listening to the event
    drag(event: CdkDragDrop<string[]>) {
        //if movement if within the same container
        if (event.previousContainer === event.container) { moveItemInArray(event.container.data, event.previousIndex, event.currentIndex); }
        //if movement if to other containers
        else { transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex); }
    }
}