import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesRoutingModule } from './properties-routing.module';
import { PropertyPageComponent } from './pages/property-page/property-page.component';
import { PropertySearchComponent } from './pages/property-search/property-search.component';

@NgModule({
  declarations: [
    PropertyPageComponent,
    PropertySearchComponent
  ],
  imports: [CommonModule, PropertiesRoutingModule],
})
export class PropertiesModule {}
