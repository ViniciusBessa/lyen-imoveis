import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyPageComponent } from './pages/property-page/property-page.component';
import { PropertySearchComponent } from './pages/property-search/property-search.component';

const propertiesRoutes: Routes = [
  { path: 'search', component: PropertySearchComponent },
  { path: ':propertyId', component: PropertyPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(propertiesRoutes)],
  exports: [RouterModule],
})
export class PropertiesRoutingModule {}
