import { AuthService } from './../../../auth/services/auth.service';
import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-content-container',
  templateUrl: './content-container.component.html',
  styleUrls: ['./content-container.component.scss'],
})
export class ContentContainerComponent implements DoCheck {
  isSecondMenuOn: boolean = true;
  isShowAuthWindow: boolean = false;

  constructor (private authService: AuthService) {}

  ngDoCheck(): void {
    this.isShowAuthWindow = this.authService.getShowWindowValue();
  }

}
