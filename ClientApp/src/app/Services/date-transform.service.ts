import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTransformService {


  formateDateDMY(date: Date): string {
    const values = this.calculateValues(date);

    return values.day + '/' + values.month + '/' + values.year;
  }

  formateDate(date: Date): string {
    const values = this.calculateValues(date);

    return values.month + '/' + values.day + '/' + values.year;
  }

  formateDateHM(dateString: string): string {
    const date = new Date(Date.parse(dateString));
    const localHours = date.getHours() - (date.getTimezoneOffset() / 60);

    return ('0' + (localHours)).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
  }

  private calculateValues(date: Date): any {
    const yearValue = date.getFullYear();
    const monthValue = (1 + date.getMonth()).toString().padStart(2, '0');
    const dayValue = date.getDate().toString().padStart(2, '0');

    return {
      day: dayValue,
      month: monthValue,
      year: yearValue
    };
  }
}
