import { Injectable, signal, resource } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CurrencyService {

    private baseUrl = 'https://api.exchangerate-api.com/v4/latest/';

    currencies = signal(['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY']);

    baseCurrency = signal('USD');

    ratesResource = resource({
        params: () => ({
            base: this.baseCurrency()
        }),

        loader: async ({ params, abortSignal }) => {
            const response = await fetch(
                `${this.baseUrl}${params.base}`,
                { signal: abortSignal }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch rates');
            }

            return response.json();
        }
    });
}