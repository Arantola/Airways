import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-way',
  templateUrl: './way.component.html',
  styleUrls: ['./way.component.scss']
})
export class WayComponent {
  @Input() isWayBack = false;
}
