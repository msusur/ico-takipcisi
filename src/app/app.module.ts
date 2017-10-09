import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { IcoListService } from './services';
import { AppComponent } from './app.component';
import {
  FooterComponent,
  BannerComponent,
  MainComponent,
  ListItemComponent
} from './components';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    BannerComponent,
    MainComponent,
    ListItemComponent
  ],
  imports: [BrowserModule],
  providers: [IcoListService],
  bootstrap: [AppComponent]
})
export class AppModule {}
