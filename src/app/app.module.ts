import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NgxPillsModule } from './modules/ngx-pills/ngx-pills.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxPillsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
