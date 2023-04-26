import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-auth-window',
  templateUrl: './auth-window.component.html',
  styleUrls: ['./auth-window.component.scss'],
})
export class AuthWindowComponent {
  @ViewChild('tabs', { static: false }) tabGroup!: MatTabGroup;

  @ViewChild('closeBtn', { static: false, read: ElementRef })
  closeBtn!: ElementRef<HTMLElement>;

  closeAuthWindow() {
    this.closeBtn.nativeElement.click();
  }

  goToSignInTab() {
    this.tabGroup.selectedIndex = 0;
  }
}
