import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { FooterComponent } from './components/footer/footer.component';
import { ContentContainerComponent } from './pages/content-container/content-container.component';
import { AppRoutingModule } from '../app-routing.module';
import { SecondMenuComponent } from './components/second-menu/second-menu.component';
import { AuthModule } from '../auth/auth.module';

const CoreComponents = [ContentContainerComponent, SecondMenuComponent, FooterComponent];

@NgModule({
  declarations: [CoreComponents],
  exports: [CoreComponents],
  imports: [CommonModule, AppRoutingModule, MaterialModule, AuthModule],
})
export class CoreModule {}
