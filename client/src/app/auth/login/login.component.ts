import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  formGroup!: FormGroup; //potentially undefined.
  email = '';
  password = '';
  error = '';
  loading = false;
  connectionErr='';

  constructor(private router: Router, private auth: AuthService) {}


  ngOnInit() {
    this.formGroup = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });

  }

  navigateToRegister() {
    this.router.navigate(['auth/register']);
  }

  onSubmit(): void {
    this.loading = true;
    this.error = '';
    this.email = this.formGroup.get('email')?.value.toLowerCase();
    this.password = this.formGroup.get('password')?.value.toLowerCase();
    // console.log('email : ', this.email)
    // console.log('password : ', this.password)
    if (!this.email || !this.password) {
      this.error = 'Make sure to fill everything ;)';
    } else {
      this.auth
        .login({ email: this.email, password: this.password })
        .subscribe(
          (res) => {
            // console.log('response login', res)
            this.loading = false;
            // this.router.navigate(['/quiz']);
            this.router.navigate(['/products']);
          },
          (err) => {
            console.log('erroare 1', err);
            if (err.status === 0){}
            // this.error = 'Server is down ... sorry :)';
            // this.error = 'Server is down ... sorry ';
            this.error = `Server is down ... sorry 😓`;
            console.log('error ', this.error)
            this.loading = false;
          }
        );
    }
  }
}
