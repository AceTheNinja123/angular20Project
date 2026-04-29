import { Component, ViewChild, ElementRef, AfterViewInit, Inject, PLATFORM_ID, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { faHand, faHandScissors, faHandBackFist } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CurrencyService } from './services/CurrencyService.service';
import { signal, computed } from '@angular/core';
@Component({
    selector: 'app-currency-converter',
    standalone: true,
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './CurrencyConverter.component.html',
    styleUrl: '../../../styles.css'
})
export class CurrencyConverterComponent {
    amount = signal<number>(1);
    toCurrency = signal<string>('EUR');

    constructor(public currencyService: CurrencyService) { }

    // Computed signal: Automatically updates when amount or rates change
    convertedAmount = computed(() => {
        const rates = this.currencyService.ratesResource.value()?.rates;
        if (!rates) return 0;
        return this.amount() * rates[this.toCurrency()];
    });

    swapCurrencies() {
        const from = this.currencyService.baseCurrency();
        const to = this.toCurrency();
        this.currencyService.baseCurrency.set(to);
        this.toCurrency.set(from);
    }
}