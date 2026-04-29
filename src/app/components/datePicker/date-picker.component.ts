import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { startOfDay, endOfDay, sub, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
import { CustomCalendarHeader } from './custom-calendar-header.component';

import { MAT_DATE_FORMATS } from '@angular/material/core';
export const MY_LONG_FORMATS = {
    parse: { dateInput: 'MMMM d, yyyy', },
    display: { dateInput: 'MMMM d, yyyy', monthYearLabel: 'MMM yyyy', dateA11yLabel: 'MMMM d, yyyy', monthYearA11yLabel: 'MMMM yyyy', },
};

@Component({
    selector: 'app-date-range-picker',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule],
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.css'],
    // providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_LONG_FORMATS },],
})
export class DatePickerComponent {
    public maxDate = new Date();
    @Output() rangeSelected = new EventEmitter<{ start: Date, end: Date }>();

    range = new FormGroup({ start: new FormControl<Date | null>(new Date()), end: new FormControl<Date | null>(new Date()), });
    customHeader = CustomCalendarHeader;
    private get referenceDate(): Date { return this.maxDate || new Date(); }

    // Preset date ranges
    public presets = [
        { label: 'Today', getValue: () => [startOfDay(this.referenceDate), endOfDay(this.referenceDate)] },
        { label: 'Yesterday', getValue: () => [startOfDay(sub(this.referenceDate, { days: 1 })), endOfDay(sub(this.referenceDate, { days: 1 }))] },
        { label: 'Last 7 Days', getValue: () => [sub(this.referenceDate, { days: 7 }), this.referenceDate] },
        { label: 'Last 30 Days', getValue: () => [sub(this.referenceDate, { days: 30 }), this.referenceDate] },
        { label: 'Last 90 Days', getValue: () => [sub(this.referenceDate, { days: 90 }), this.referenceDate] },
        { label: 'This Month', getValue: () => [startOfMonth(this.referenceDate), this.referenceDate] },
        { label: 'Last Month', getValue: () => [startOfMonth(sub(this.referenceDate, { months: 1 })), endOfMonth(sub(this.referenceDate, { months: 1 }))] },
        { label: 'This Year', getValue: () => [startOfYear(this.referenceDate), this.referenceDate] },
        { label: 'Last Year', getValue: () => [startOfYear(sub(this.referenceDate, { years: 1 })), endOfYear(sub(this.referenceDate, { years: 1 }))] },
        { label: 'Last 365 Days', getValue: () => [sub(this.referenceDate, { days: 365 }), this.referenceDate] },
    ];

    public activePreset: string = 'Today'; // Default highlighted
    selectPreset(preset: any) {
        this.activePreset = preset.label;
        const [start, end] = preset.getValue();
        this.range.patchValue({ start, end });
        this.apply();
    }

    apply() {
        const { start, end } = this.range.value;
        if (start && end) { this.rangeSelected.emit({ start, end }); }
    }

    cancel() { this.range.reset(); }
}