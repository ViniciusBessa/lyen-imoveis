import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesRoutingModule } from './properties-routing.module';
import { PropertyPageComponent } from './pages/property-page/property-page.component';
import { PropertySearchComponent } from './pages/property-search/property-search.component';
import { PropertiesFilterComponent } from './components/properties-filter/properties-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PropertyPageComponent,
    PropertySearchComponent,
    PropertiesFilterComponent,
  ],
  imports: [
    CommonModule,
    PropertiesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class PropertiesModule {}
