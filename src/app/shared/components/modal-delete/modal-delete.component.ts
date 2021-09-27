import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'jm-modal-delete',
  templateUrl: './modal-delete.component.html'
})
export class ModalDeleteComponent implements OnInit {
  description: string = "Are you sure you want to delete?";
  onConfirm: () => void;

  public static show(dialogService: DialogService, confirmCallback: () => void): DynamicDialogRef {
    const ref: DynamicDialogRef = dialogService.open(ModalDeleteComponent, {
            data: {
              confirmCallback: confirmCallback
            },
            header: "Notification",
            width: "50%",
            style: { "max-width": "500px" },
            contentStyle: { "max-height": "400px", overflow: "auto" },
            baseZIndex: 12000
        });
    return ref;
  }

  constructor(
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig) { 
      this.onConfirm = config.data ? config.data.confirmCallback : null;
  }

  ngOnInit() {
  }

  cancel() {
    this.ref.close();
  }

  ok() {
    if (this.onConfirm) {
      this.onConfirm();
    }

    this.ref.close();
  }
}
