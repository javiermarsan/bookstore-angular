import * as moment from 'moment';
export class DateHelper {

  public static DMYFormat: string = 'DD/MM/YYYY';
  public static DMYTimeFormat: string = 'DD/MM/YYYY HH:mm:ss';
  public static DMYHMFormat: string = 'HH:mm';

  public static onFormatDate = (date: Date): string => {
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear() % 100);
  }

  public static toDateWithoutTime(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  public static toDateDMY(strDate: string): Date {
    const date = moment(strDate, this.DMYFormat).toDate();
    return date;
  }

  public static toDateDMYTime(strDate: string): Date {
    const date = moment(strDate, this.DMYTimeFormat).toDate();
    return date;
  }  

  public static toDateSharepoint(strDate: string): Date {
    const date = moment(strDate, 'YYYY-MM-DDTHH:mm:ss').toDate();
    return date;
  }

  public static formatSharepoint(date: Date): string {
    const str = moment(date).format('YYYY-MM-DD HH:mm:ss');
    return str;
  }

  public static formatDMY(date: Date): string {
    const str = moment(date).format(this.DMYFormat);
    return str;
  }

  public static formatDMYTime(date: Date): string {
    const str = moment(date).format(this.DMYTimeFormat);
    return str;
  }

  public static formatHoursMinutes(date: Date): string {
    const str = moment(date).format(this.DMYHMFormat);
    return str;
  }

  public static isEqual(date1: Date, date2: Date): boolean {
    if (!date1 && !date2) {
      return true;
    } else if (!date1 || !date2) {
      return false;
    } else {
      return date1.getTime() === date2.getTime();
    }
  }

  public static now(): Date {
    return new Date();
  }

  public static today(): Date {
    return DateHelper.toDateWithoutTime(new Date());
  }

  public static addHours(date: Date, h: number): void {
    if (date) {
      date.setTime(date.getTime() + (h * 60 * 60 * 1000));
    }
  }

  public static addDays(date: Date, days: number): Date {
    return moment(date).add(days, 'days').toDate();
  }
}
