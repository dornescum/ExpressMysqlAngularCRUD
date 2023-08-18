import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthRoutingModule} from './auth-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';


@NgModule({
  declarations: [LoginComponent, RegisterComponent],
	imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, PasswordModule, ButtonModule, CheckboxModule]
})
export class AuthModule {
}
