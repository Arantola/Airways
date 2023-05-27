import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-payment-modal-window',
  templateUrl: './payment-modal-window.component.html',
  styleUrls: ['./payment-modal-window.component.scss']
})

export class PaymentModalWindowComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}

