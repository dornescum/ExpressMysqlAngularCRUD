import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  form!: FormGroup;
  city!: any;
  towns!: any;
  favorite!: any;
  uploadedFiles: any[] = [];
  cities: City[] | undefined;
  selectedCity!:any;



  // private messageService: MessageService
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.favorite = [
      {favorite: true, id:1},
      {favorite: false, id:2},
    ];

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];

    this.form = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      favorite:new FormControl<string | null>(null, [Validators.required]),
      quantity: new FormControl<string | null>(null, [Validators.required]),
      brand: new FormControl<string | null>(null, [Validators.required]),
      category: new FormControl<string | null>(null, [Validators.required]),
      text: new FormControl<string | null>(null, [Validators.required]),
      selectedCity: new FormControl<City | null>(null),
      city: new FormControl<City | null>(null)
    });
    // console.log(this.form.value)
  }

  onSubmit() {
    console.log('click')
    console.log(this.form.value);
    // this.selectedCity = this.form.value.selectedCity;
    // console.log(this.selectedCity)

    this.form.valueChanges.subscribe((data) => {
      console.log("data change", data['selectedCity']);
    })
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

}
