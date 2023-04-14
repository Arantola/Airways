import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [CommonModule, MaterialModule],
  exports: [FooterComponent],
})
export class CoreModule {}
