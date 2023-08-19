import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  formGroup!: FormGroup; //potentially undefined.
  registerForm!: FormGroup;
  email = '';
  password = '';
  confirmPassword = '';
  error = '';
  loading = false;
  age!: number;
  terms!: boolean;
  nickname!: string;

  constructor(private formBuilder: FormBuilder,private router: Router, private auth: AuthService) {}


  ngOnInit() {
    this.formGroup = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      terms: new FormControl<boolean | null>(null, [Validators.required]),
      age: new FormControl<number | null>(null, [Validators.required, Validators.min(2)]),
      nickname: new FormControl('', [Validators.required, Validators.minLength(3)]),

    });
    console.log('ng', this.formGroup.value )
  }



  onSubmit(): void {
    // console.log('on submit')
    console.log('form ', this.formGroup.value )

    this.loading = true;
    this.error = '';
    this.email = this.formGroup.get('email')?.value?.toLowerCase() || '';
    this.password = this.formGroup.get('password')?.value?.toLowerCase();
    this.confirmPassword = this.formGroup.get('confirmPassword')?.value?.toLowerCase();
    this.age = this.formGroup.get('age')?.value;
    this.terms = this.formGroup.get('terms')?.value;
    this.nickname = this.formGroup.get('nickname')?.value;

    console.log('email', this.email)
    console.log('password', this.password)
    console.log('confirm', this.confirmPassword)
    console.log('age', this.age)
    console.log('terms', this.terms)
    console.log('nickname', this.nickname)
    if (!this.email || !this.password) {
      this.error = 'Make sure to fill everything ;)';
    }
    else if(this.password !== this.confirmPassword){
      this.error = 'Passwords need to match';
    }
    else {
      this.auth
        .register({ email: this.email, password: this.password, age: this.age, nickname: this.nickname })
        .subscribe(
          (res) => {
            console.log('response register ', res)
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

//
// onSubmit(): void {
//   if (this.formGroup.valid) {
//   this.loading = true;
//   this.error = '';
//
//   this.email = this.formGroup.get('email')?.value.toLowerCase();
//   this.password = this.formGroup.get('password')?.value;
//   this.confirmPassword = this.formGroup.get('confirmPassword')?.value;
//   this.age = this.formGroup.get('age')?.value;
//   this.nickname = this.formGroup.get('nickname')?.value;
//   this.agree = this.formGroup.get('agree')?.value;
//
//   if (!this.email || !this.password) {
//     this.error = 'Make sure to fill everything ;)';
//   } else if (this.password !== this.confirmPassword) {
//     this.error = 'Passwords need to match';
//   } else {
//     // Rest of your logic for submitting the form
//   }
// } else {
//   // Handle case when the form is not valid
// }
// }
