import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  formGroup!: FormGroup; //potentially undefined.
  email = '';
  password = '';
  confirmPassword = '';
  error = '';
  loading = false;

  constructor(private router: Router, private auth: AuthService) {}


  ngOnInit() {
    this.formGroup = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      agree: new FormControl<string | null>(null)

    });

  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }

  onSubmit(): void {
    this.loading = true;
    this.error = '';
    this.email = this.formGroup.get('email')?.value.toLowerCase();
    this.password = this.formGroup.get('password')?.value.toLowerCase();
    this.confirmPassword = this.formGroup.get('confirmPassword')?.value.toLowerCase();
    if (!this.email || !this.password) {
      this.error = 'Make sure to fill everything ;)';
    }
    else if(this.password !== this.confirmPassword){
      this.error = 'Passwords need to match';
    }

    else {
      this.auth
        .register({ email: this.email, password: this.password })
        .subscribe(
          (res) => {
            console.log('response login', res)
            this.loading = false;
            this.router.navigate(['/auth/login']);
          },
          (err) => {
            console.log(err);
            this.error = err.error.message;
            this.loading = false;
          }
        );
    }
  }

}
