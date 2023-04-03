import { Route } from '@angular/router';
import { ChordTrainingPageComponent } from './pages/chord-training-page/chord-training-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { SymbolTrainingPageComponent } from './pages/symbol-training-page/symbol-training-page.component';

export const appRoutes: Route[] = [
  {
    path: 'layouts',
    component: LayoutPageComponent,
  },
  {
    path: 'symbol-training',
    component: SymbolTrainingPageComponent,
  },
  {
    path: 'chord-training',
    component: ChordTrainingPageComponent,
  },
];
