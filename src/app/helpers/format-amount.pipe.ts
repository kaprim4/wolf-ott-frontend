import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatAmount'
})
export class FormatAmountPipe implements PipeTransform {
    transform(amount: number, decimals: number = 2, currency: string = 'USD'): string {
        return amount.toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
            style: 'currency',
            currency: currency
        });
    }
}
