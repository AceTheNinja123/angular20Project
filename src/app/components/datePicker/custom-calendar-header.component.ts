import { Component } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';

@Component({
    selector: 'custom-calendar-header',
    standalone: true,
    template: `
    <div class="custom-header">
      <button class="date-button" (click)="openPicker()">
        {{ formatDate(calendar.activeDate) }}
        <span class="arrow">▼</span>
      </button>
    </div>
  `,
    styles: [`
    .custom-header {
      display: flex;
      justify-content: center;
      padding: 8px;
    }

    .date-button {
      padding: 6px 12px;
      font-size: 14px;
      cursor: pointer;
    }

    .arrow {
      margin-left: 5px;
      font-size: 10px;
    }
  `]
})
export class CustomCalendarHeader {
    constructor(public calendar: MatCalendar<Date>) { }

    formatDate(date: Date): string {
        return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    openPicker() { this.calendar.currentView = 'multi-year'; }
}