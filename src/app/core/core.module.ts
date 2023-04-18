import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { FooterComponent } from './components/footer/footer.component';
import { ContentContainerComponent } from './pages/content-container/content-container.component';
import { AppRoutingModule } from '../app-routing.module';
import { SecondMenuComponent } from './components/second-menu/second-menu.component';
import { StepperComponent } from './components/stepper/stepper.component';

const CoreComponents = [ContentContainerComponent, SecondMenuComponent, FooterComponent];

@NgModule({
  declarations: [CoreComponents, StepperComponent],
  exports: [CoreComponents, StepperComponent],
  imports: [CommonModule, AppRoutingModule, MaterialModule],
})
export class CoreModule {}
