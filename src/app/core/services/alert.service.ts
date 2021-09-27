import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Alert, AlertType } from '../../core/models/alert.model';
import { ApiErrors, ApiError } from '../../core/models/api-errors.model';
import { DictionaryString } from '../models/dictionary-string.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<Alert>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
            if (this.keepAfterRouteChange) {
              // only keep for a single route change
              this.keepAfterRouteChange = false;
            }
            else {
              // clear alert messages
              this.clear();
            }
        }
    });
  }

  // subscribe to alerts
  getAlert(alertId?: string): Observable<any> {
    return this.subject.asObservable().pipe(filter((x: Alert) => x && x.alertId === alertId));
  }

  // clear alerts
  clear(alertId?: string) {
    this.subject.next(new Alert({ alertId }));
  }

  // main alert method
  alert(alert: Alert) {
    this.keepAfterRouteChange = alert.keepAfterRouteChange;
    this.subject.next(alert);
  }

  // convenience methods
  success(message: string) {
    this.alert(new Alert({ message, type: AlertType.Success }));
  }

  info(message: string) {
    this.alert(new Alert({ message, type: AlertType.Info }));
  }

  warn(message: string) {
    this.alert(new Alert({ message, type: AlertType.Warning }));
  }

  error(value: any, labels: DictionaryString = null) {
    const apiErrors: ApiErrors = ApiErrors.is(value) ? value as ApiErrors : ApiErrors.parse(value);

    apiErrors.iterate((err: ApiError) => {
      const key = err.key;
      let message = err.message;
      if (key && message && labels && labels[key]) {
        const text = labels[key];
        message = message.replace(key, text);
      }
      this.alertError(message);
    });    
  }

  private alertError(message: string) {
    this.alert(new Alert({ message, type: AlertType.Error }));
  }

}
