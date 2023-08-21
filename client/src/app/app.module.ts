import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ButtonModule} from "primeng/button";
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';



import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/UI/header/header.component';
import {PanelModule} from "primeng/panel";
import {MenuModule} from "primeng/menu";
import {MenubarModule} from "primeng/menubar";
// import { ProfileComponent } from './auth/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // ProfileComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    PasswordModule,
    ReactiveFormsModule,
    CheckboxModule,
    HttpClientModule,
    PanelModule,
    MenuModule,
    MenubarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
