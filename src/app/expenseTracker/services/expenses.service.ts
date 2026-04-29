// src/app/services/expenses.service.ts
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

interface Expense { name: string; amount: number; category: string; account: string; }

@Injectable({ providedIn: 'root' })
export class ExpenseService {
    private platformId = inject(PLATFORM_ID);
    private expensesKey = 'expenses';
    private expenses = new BehaviorSubject<Expense[]>(this.getExpenses());
    expenses$ = this.expenses.asObservable();

    private getExpenses(): Expense[] {
        if (!isPlatformBrowser(this.platformId)) { return []; }
        try {
            const savedExpenses = localStorage.getItem(this.expensesKey);
            return savedExpenses ? JSON.parse(savedExpenses) : [];
        } catch (error) {
            console.error('Failed to parse expenses from localStorage', error);
            return [];
        }
    }

    private saveExpenses(expenses: Expense[]) {
        if (!isPlatformBrowser(this.platformId)) { return; }
        try { localStorage.setItem(this.expensesKey, JSON.stringify(expenses)); }
        catch (error) { console.error('Failed to save expenses to localStorage', error); }
    }

    addExpense(expense: Expense) {
        const currentExpenses = this.expenses.value;
        currentExpenses.push(expense);
        this.saveExpenses(currentExpenses);
        this.expenses.next([...currentExpenses]);
    }


    deleteExpense(index: number) {
        const currentExpenses = this.expenses.value;
        if (index >= 0 && index < currentExpenses.length) {
            currentExpenses.splice(index, 1);
            this.saveExpenses(currentExpenses);
            this.expenses.next([...currentExpenses]);
        } else { console.error('Invalid index for deletion'); }
    }
}