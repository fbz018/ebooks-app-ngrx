import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitTextAt'
})
export class TruncatePipe {
  transform(value: string, args?: number): string {
    const length: number = args ? +args : -1;
    if (length === -1 || value == null || value.length <= length) {
      return value;
    }

    return value.substring(0, length) + '...';
  }
}