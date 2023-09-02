import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule, UiModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientModule
  ],
  providers: [
    { provide: "baseUrl", useValue: "https://localhost:7108/api", multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
