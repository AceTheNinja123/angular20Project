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
    selector: 'app-table-with-date-range',
    standalone: true,
    providers: [provideNativeDateAdapter(MY_FORMATS)],
    templateUrl: './TableWithDateRange.component.html',
    styleUrls: ['../../../styles.css'],
    imports: [CommonModule, ReactiveFormsModule, DatePickerComponent, MatMenuModule, MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule,],
})
export class TableWithDateRangeComponent implements AfterViewInit {
    public range = new FormGroup({ start: new FormControl<Date | null>(null), end: new FormControl<Date | null>(null), });
    public displayedColumns: string[] = ['id', 'name', 'date', 'status'];
    public dataSource = new MatTableDataSource<PeriodicElement>(this.getMockData());
    public today = new Date();

    @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor() {
        // Custom filter logic to handle date objects
        this.dataSource.filterPredicate = (data: PeriodicElement) => {
            const start = this.range.value.start;
            const end = this.range.value.end;
            if (start && end) { return data.date >= start && data.date <= end; }
            return true;
        };
    }

    ngAfterViewInit() { this.dataSource.paginator = this.paginator; }

    public get buttonLabel(): string {
        const start = this.range.value.start;
        const end = this.range.value.end;
        const pipe = new DatePipe('en-US');
        if (start && end) { return `${pipe.transform(start, 'longDate')} - ${pipe.transform(end, 'longDate')}`; }
        return 'Select Date Range';
    }

    public onExternalRangeSelected(range: any): void {
        if (range && range.startDate && range.endDate) {
            this.range.patchValue({ start: range.startDate.toDate(), end: range.endDate.toDate() });
            this.onDateChange();
        }
    }

    public onDateChange(): void {
        if (this.range.value.start && this.range.value.end) {
            this.dataSource.filter = '' + Math.random();
        }
    }

    public clearFilter(): void {
        this.range.reset();
        this.dataSource.filter = '';
    }

    public onRangeSelected(selectedRange: { start: Date, end: Date }): void {
        this.range.patchValue({ start: selectedRange.start, end: selectedRange.end });
        this.onDateChange(); // Triggers table filter
        this.menuTrigger.closeMenu(); // Close menu only after range is valid
    }

    private getMockData(): PeriodicElement[] {
        const baseDate = new Date(2023, 0, 1);
        const currentDate = new Date();
        const diffInMs = Math.abs(currentDate.getTime() - baseDate.getTime());
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1;
        return Array.from({ length: diffInDays }, (_, i) => ({
            id: i + 1,
            name: `Item ${i + 1}`,
            date: new Date(2023, 0, i + 1),
            status: i % 2 === 0 ? 'Completed' : 'Pending'
        }));
    }
}