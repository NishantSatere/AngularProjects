import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'AgePipe',
  standalone: true, // Mark the pipe as standalone
})
export class AgePipe implements PipeTransform {
  transform(value: number): string {
    const ageStr = value.toString().slice(0, 2);
    return `${ageStr} years old`;
  }
}

@Pipe({
  name: 'SalaryConverator',
  standalone: true, // Standalone pipe
})
export class SalaryConverator implements PipeTransform {
  transform(value: number): string {
    const convertedSalary = value / 80;
    return `$ ${convertedSalary.toFixed(2)}`; // Format to two decimal places
  }
}

@Pipe({
    name: 'CustomDatePipe',
    standalone: true,
  })
  export class CustomDatePipe implements PipeTransform {
    transform(value: string): string {
      const date = new Date(value); // Convert the string to a Date object
      const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      };
      return date.toLocaleDateString('en-US', options); // Format the date
    }
  }

  @Pipe({
    name: 'AddressPipe',
    standalone: true,
  })
  export class AddressPipe implements PipeTransform {
    transform(city: string, pincode: string): string {
      return `Address: ${city}, Pincode: ${pincode}`;
    }
  }