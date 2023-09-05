import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-img-testing', templateUrl: './img-testing.component.html', styleUrls: ['./img-testing.component.scss']
})
export class ImgTestingComponent implements OnInit {

  formGroup!: FormGroup;
  target: any = '';
  file: any;
  img!: any;

  constructor(private route: Router, private http: HttpClient) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      img: new FormControl(''),
    });
  }

  imageUpload(event: any) {
    this.file = event.target.files[0];

    // Limit  5 MB
    const maxSize = 5 * 1024 * 1024;

    //  size
    if (this.file.size > maxSize) {
      alert('File size should not exceed 5 MB');
      this.file = null;
      return;
    }

    // JPEG  PNG
    if (!['image/jpeg', 'image/png'].includes(this.file.type)) {
      alert('Only JPEG or PNG files are allowed');
      this.file = null;
      return;
    }
  }


  onSubmit() {
    const formData = new FormData();
    formData.append('product', this.file);
    const value = formData.get('product');
    // TODO auth user
    setTimeout(() => {
      this.http.post(`http://localhost:3000/api/v1/profile/5`, formData).subscribe((response) => console.log('response : ', response),
        (error) => console.log(error));
    }, 100)
  }

}
