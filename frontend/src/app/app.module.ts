import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WelcomeContentComponent } from './welcome-content/welcome-content.component'; 
import { ContentComponent } from './content/content.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { ButtonsComponent } from './header/buttons/buttons.component';
import { DataStorageService } from './shared/data.storage.service';
import { fishService } from './shared/fish.service';  
 import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { backupData } from 'src/assets/fishBackup';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeContentComponent, 
    ContentComponent, 
    ButtonsComponent,  
    // AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  AppRoutingModule,
  CoreModule,
  BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
