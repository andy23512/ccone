import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { LayoutComponent } from './components/layout/layout.component';
import { SwitchComponent } from './components/switch/switch.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { CamelToKebabPipe } from './pipes/camel-to-kebab.pipe';
import { SymbolTrainingPageComponent } from './pages/symbol-training-page/symbol-training-page.component';
import { ChordTrainingPageComponent } from './pages/chord-training-page/chord-training-page.component';
import { BpmfPipe } from './pipes/bpmf.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SwitchComponent,
    LayoutComponent,
    CamelToKebabPipe,
    LayoutPageComponent,
    SymbolTrainingPageComponent,
    ChordTrainingPageComponent,
    BpmfPipe,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
