// app.component.ts

import { Component, } from '@angular/core';
import { ColorPickerService, ColorPickerDirective } from 'ngx-color-picker';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-colour-picker',
    imports: [ColorPickerDirective, MatCardModule],
    templateUrl: './ColourPicker.component.html',
    styleUrl: '../../../styles.css'
})
export class ColourPickerComponent {
    public title: string = 'color-picker-app';
    public selectedColor: string = '#e45a33';

    constructor(private cpService: ColorPickerService) { }

    public onColorChange(color: string): void { this.selectedColor = color; }
}