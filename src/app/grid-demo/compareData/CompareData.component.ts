import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { DatePickerComponent } from '@components/datePicker/date-picker.component';
interface PeriodicElement { id: number; name: string; date: Date; status: string; }
export const MY_FORMATS = {
    parse: { dateInput: 'DDD', },
    display: { dateInput: 'DDD', monthYearLabel: 'MMM yyyy', dateA11yLabel: 'DDD', monthYearA11yLabel: 'MMMM yyyy', },
};
@Component({
    selector: 'app-compare-data',
    standalone: true,
    providers: [provideNativeDateAdapter(MY_FORMATS)],
    templateUrl: './CompareData.component.html',
    styleUrls: ['../../../styles.css'],
    imports: [CommonModule, ReactiveFormsModule, DatePickerComponent, MatMenuModule, MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule,],
})
export class CompareDataComponent implements AfterViewInit {
    public today = new Date();
    public range1 = new FormGroup({ start: new FormControl<Date | null>(null), end: new FormControl<Date | null>(null), });
    public displayedColumns1: string[] = ['id', 'name', 'date', 'status'];
    public dataSource1 = new MatTableDataSource<PeriodicElement>(this.getMockDataSet1());
    public range2 = new FormGroup({ start: new FormControl<Date | null>(null), end: new FormControl<Date | null>(null), });
    public displayedColumns2: string[] = ['id', 'name', 'date', 'status'];
    public dataSource2 = new MatTableDataSource<PeriodicElement>(this.getMockDataSet2());
    @ViewChild('trigger1', { read: MatMenuTrigger }) trigger1!: MatMenuTrigger;
    @ViewChild('trigger2', { read: MatMenuTrigger }) trigger2!: MatMenuTrigger;
    @ViewChild('paginator1') paginator1!: MatPaginator;
    @ViewChild('paginator2') paginator2!: MatPaginator;

    constructor() {
        // Custom filter logic to handle date objects
        this.dataSource1.filterPredicate = (data: PeriodicElement) => {
            if (data.date > this.today) return false;
            const start = this.range1.value.start;
            const end = this.range1.value.end;
            if (start && end) { return data.date >= start && data.date <= end; }
            return true;
        };
        this.dataSource2.filterPredicate = (data: PeriodicElement) => {
            if (data.date > this.today) return false;
            const start = this.range2.value.start;
            const end = this.range2.value.end;
            if (start && end) { return data.date >= start && data.date <= end; }
            return true;
        };
    }

    ngAfterViewInit() {
        this.dataSource1.paginator = this.paginator1;
        this.dataSource2.paginator = this.paginator2;
    }

    public get buttonLabel1(): string {
        const start = this.range1.value.start;
        const end = this.range1.value.end;
        const pipe = new DatePipe('en-US');
        if (start && end) { return `${pipe.transform(start, 'longDate')} - ${pipe.transform(end, 'longDate')}`; }
        return 'Select Date Range';
    }

    public onExternalRangeSelected1(range: any): void {
        if (range && range.startDate && range.endDate) {
            this.range1.patchValue({ start: range.startDate.toDate(), end: range.endDate.toDate() });
            this.onDateChange();
        }
    }

    public get buttonLabel2(): string {
        const start = this.range2.value.start;
        const end = this.range2.value.end;
        const pipe = new DatePipe('en-US');
        if (start && end) { return `${pipe.transform(start, 'longDate')} - ${pipe.transform(end, 'longDate')}`; }
        return 'Select Date Range';
    }

    public onExternalRangeSelected2(range: any): void {
        if (range && range.startDate && range.endDate) {
            this.range2.patchValue({ start: range.startDate.toDate(), end: range.endDate.toDate() });
            this.onDateChange();
        }
    }

    public onDateChange(): void {
        if (this.range1.value.start && this.range1.value.end) { this.dataSource1.filter = '' + Math.random(); }
        if (this.range2.value.start && this.range2.value.end) { this.dataSource2.filter = '' + Math.random(); }
    }

    public clearFilter(): void {
        this.range1.reset();
        this.range2.reset();
        this.dataSource1.filter = '';
        this.dataSource2.filter = '';
    }

    public onRangeSelected1(selectedRange: { start: Date, end: Date }): void {
        const end = selectedRange.end > this.today ? this.today : selectedRange.end;
        this.range1.patchValue({ start: selectedRange.start, end: end });
        this.onDateChange(); // Triggers table filter
        this.trigger1.closeMenu();
    }
    public onRangeSelected2(selectedRange: { start: Date, end: Date }): void {
        const end = selectedRange.end > this.today ? this.today : selectedRange.end;
        this.range2.patchValue({ start: selectedRange.start, end: end });
        this.onDateChange(); // Triggers table filter
        this.trigger2.closeMenu();
    }

    private getMockDataSet1(): PeriodicElement[] {
        const baseDate = new Date(2023, 0, 1);
        const currentDate = new Date();
        const diffInMs = Math.abs(currentDate.getTime() - baseDate.getTime());
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1;
        return Array.from({ length: diffInDays }, (_, i) => ({
            id: i + 1,
            name: `Alpha Task - ${i + 1}`,
            date: new Date(2023, 0, i + 1),
            status: i % 3 === 0 ? 'Completed' : (i % 3 === 1 ? 'In Progress' : 'Stalled')
        }));
    }

    private getMockDataSet2(): PeriodicElement[] {
        const baseDate = new Date(2023, 0, 1);
        const currentDate = new Date();
        const diffInMs = Math.abs(currentDate.getTime() - baseDate.getTime());
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1;
        return Array.from({ length: diffInDays }, (_, i) => ({
            id: i + 1,
            name: `Beta Log - ${i + 1}`,
            date: new Date(2023, 0, i + 1),
            status: i % 2 === 0 ? 'Verified' : 'Flagged'
        }));
    }
}