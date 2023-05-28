import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-summary-modal-window',
  templateUrl: './summary-modal-window.component.html',
  styleUrls: ['./summary-modal-window.component.scss'],
})
export class SummaryModalWindowComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
