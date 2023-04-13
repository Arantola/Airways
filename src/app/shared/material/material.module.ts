import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

const MaterialModules = [
  MatInputModule,
  MatButtonModule,
  MatButtonToggleModule,
];

@NgModule({
  imports: [MaterialModules],
  exports: [MaterialModules],
  providers: [],
})
export class MaterialModule {}
