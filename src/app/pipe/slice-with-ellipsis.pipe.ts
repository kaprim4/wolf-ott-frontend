import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sliceWithEllipsis'
})
export class SliceWithEllipsisPipe implements PipeTransform {

    transform(value: string, start: number, end: number): string {
        if (!value) return '';
        let slicedValue = value.slice(start, end);
        return slicedValue.length < value.length ? slicedValue + '...' : slicedValue;
    }
}
