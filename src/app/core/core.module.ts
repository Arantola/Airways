import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { ContentContainerComponent } from './pages/content-container/content-container.component';
import { AppRoutingModule } from '../app-routing.module';

const CoreComponents = [ContentContainerComponent];

@NgModule({
  declarations: [CoreComponents],
  exports: [CoreComponents],
  imports: [CommonModule, AppRoutingModule, MaterialModule],
})
export class CoreModule {}
