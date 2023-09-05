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
  img!:any;

  constructor(private route: Router, private http: HttpClient) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      img: new FormControl(''),
    });
  }

  imageUpload(event: any) {
    this.file = event.target.files[0];
  }


  onSubmit() {
    const formData = new FormData();
    formData.append('product', this.file);
    const value = formData.get("product");
  setTimeout(()=>{
  this.http.post(`http://localhost:3000/api/v1/profile/5`, formData).subscribe(
    (response) => console.log('response : ', response),
    (error) => console.log(error)
  );
}, 100)
  }

}
