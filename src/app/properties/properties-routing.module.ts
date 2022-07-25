import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyPageComponent } from './pages/property-page/property-page.component';
import { PropertySearchComponent } from './pages/property-search/property-search.component';

const propertiesRoutes: Routes = [
  {
    path: 'search',
    component: PropertySearchComponent,
    data: { title: 'Busca' },
  },
  {
    path: ':propertyId',
    component: PropertyPageComponent,
    data: { title: 'Imóvel' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(propertiesRoutes)],
  exports: [RouterModule],
})
export class PropertiesRoutingModule {}
