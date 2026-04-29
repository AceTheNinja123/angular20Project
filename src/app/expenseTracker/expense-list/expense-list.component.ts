// src/app/expense-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expenses.service';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faX, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
// this is inspoation from: https://www.geeksforgeeks.org/angular-js/expense-tracker-using-angular/

@Component({
    selector: 'app-expense-list',
    standalone: true,
    imports: [FormsModule, FontAwesomeModule, CommonModule],
    templateUrl: './expense-list.component.html',
})
export class ExpenseListComponent {
    faPlus = faPlus;
    faX = faX;
    faSave = faSave;
    faTrash = faTrash;
    expenses: any[] = [];
    isFormVisible = false;
    newExpense = { name: '', amount: 0, category: '', account: '' };
    categories = ['Baby', 'Beauty', 'Bills', 'Car', 'Clothing', 'Education', 'Electronic', 'Entertainment', 'Food', 'Health', 'Home', 'Insurance', 'Shopping', 'Social', 'Sport', 'Tax', 'Telephone', 'Transportation'];
    // Example categories
    accounts = ['Savings', 'Cash', 'Card']
    constructor(private expenseService: ExpenseService) { }

    ngOnInit() {
        // Subscribe to the expenses observable
        this.expenseService.expenses$.subscribe(expenses => { this.expenses = expenses; });
    }
    openExpenseForm() { this.isFormVisible = true; }
    closeExpenseForm() {
        this.isFormVisible = false;
        this.newExpense = { name: '', amount: 0, category: '', account: '' };
    }

    addExpense() {
        if (this.newExpense.name && this.newExpense.amount && this.newExpense.category && this.newExpense.account) {
            this.expenseService.addExpense(this.newExpense);
            this.closeExpenseForm();
        }
    }

    deleteExpense(expense: any) {
        const index = this.expenses.findIndex(e => e === expense);
        // Find index based on the expense object
        if (index >= 0) { this.expenseService.deleteExpense(index); }
        else { console.error('Expense not found for deletion'); }
    }

}