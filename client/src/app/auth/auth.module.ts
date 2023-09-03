import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthRoutingModule} from './auth-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {ProfileComponent} from './profile/profile.component';
import {NgxBarcode6Module} from "ngx-barcode6";



@NgModule({
  declarations: [LoginComponent, RegisterComponent, ProfileComponent],
    imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, PasswordModule, ButtonModule, CheckboxModule, InputNumberModule, InputTextModule, NgxBarcode6Module]
})
export class AuthModule {
}
