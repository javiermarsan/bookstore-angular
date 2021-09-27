import { Component, OnInit, Input } from '@angular/core';
import { Alert, AlertType } from '../../../core/models/alert.model';
import { AlertService } from '../../../core/services/alert.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'jm-alert',
  templateUrl: './alert.component.html',
  providers: [MessageService]
})
export class AlertComponent implements OnInit {

  @Input() id: string;

  // alerts: Alert[] = [];

  constructor(
    private alertService: AlertService,
    private messageService: MessageService
    ) { }

  ngOnInit() {
      this.alertService.getAlert(this.id).subscribe((alert: Alert) => {
          if (!alert.message) {
              // clear alerts when an empty alert is received
              // this.alerts = [];
              return;
          }

          // add alert to array
          // this.alerts.push(alert);

          // toast
          this.addToastMessage(alert);
      });
  }

  private addToastMessage(alert: Alert) {
    if (!alert) {
        return;
    }

    let severity = 'error';
    let life = 3000;

    switch (alert.type) {
      case AlertType.Success:
        severity = 'success'; break;
      case AlertType.Error:
        severity = 'error'; life = 6000; break;
      case AlertType.Info:
        severity = 'info'; break;
      case AlertType.Warning:
        severity = 'warn'; break;
    }

    this.messageService.add({ severity: severity, summary: alert.message, life: life });
  }

  /*removeAlert(alert: Alert) {
      this.alerts = this.alerts.filter(x => x !== alert);
  }

  cssClass(alert: Alert) {
      if (!alert) {
          return;
      }

      // return css class based on alert type
      switch (alert.type) {
          case AlertType.Success:
              return 'alert alert-success';
          case AlertType.Error:
              return 'alert alert-danger';
          case AlertType.Info:
              return 'alert alert-info';
          case AlertType.Warning:
              return 'alert alert-warning';
      }
  }*/
}
