import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesRoutingModule } from './properties-routing.module';
import { PropertyPageComponent } from './pages/property-page/property-page.component';
import { PropertySearchComponent } from './pages/property-search/property-search.component';
import { PropertiesFilterComponent } from './components/properties-filter/properties-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PropertyItemComponent } from './components/property-item/property-item.component';

@NgModule({
  declarations: [
    PropertyPageComponent,
    PropertySearchComponent,
    PropertiesFilterComponent,
    PropertyItemComponent,
  ],
  imports: [CommonModule, PropertiesRoutingModule, ReactiveFormsModule],
})
export class PropertiesModule {}
