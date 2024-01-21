import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';  
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { ButtonsComponent } from './header/buttons/buttons.component'; 
 import { AppRoutingModule } from './app-routing.module'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, 
    ButtonsComponent 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule, 
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
