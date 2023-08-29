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
  imagePreview:any;

  constructor(private route: Router, private http: HttpClient) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      // password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      // email: new FormControl('', [Validators.required, Validators.email]),
      img: new FormControl(''),
    });
  }

  imageUpload(event: any) {
    console.log('event ', event);
    this.file = event.target.files[0];
    console.log('file ff', this.file);
    console.log('file ff2 ', this.file.image);


  //   if (this.file) {
  //     // Create a FileReader to read the file
  //     const reader = new FileReader();
  //     // Set up a callback function for when the file is loaded
  //     reader.onload = function (loadEvent) {
  //       // The binary data is in reader.result
  //       const binaryData = loadEvent?.['target']?.['result'];
  //       // You can now use binaryData as needed
  //       console.log(binaryData);
  //       // If you want to convert it to a different format, like base64:
  //       // const base64Data = btoa(binaryData);
  //       // console.log(base64Data);
  //     };
  //     // Read the file as binary data
  //     reader.readAsArrayBuffer(this.file);
  //   }
  //
  //
  //
  //   if (this.file) {
  //     const reader = new FileReader;
  //
  //     reader.onload = (e: any) => {
  //       this.imagePreview = e.target.result;
  //     }
  //
  //     reader.readAsDataURL(this.file);
  //   }
  }


  onSubmit() {
    // console.log(this.formGroup.value)
    // this.img = this.formGroup.get('img')?.value;
    // console.log('img: ', this.img)

    const formData = new FormData();
    formData.append('product', this.file);
    console.log('type ', typeof formData);
    // console.log('img: ', JSON.stringify(formData['product']))
    const value = formData.get("product");
    console.log('value : ', value)
  setTimeout(()=>{
  console.log('wait')
  this.http.post(`http://localhost:3000/api/v1/profile/5`, formData).subscribe(
    (response) => console.log('response : ', response),
    (error) => console.log(error)
  );
}, 100)
    // Use Angular's HttpClient to send the FormData
    // this.http.post(`http://localhost:3000/api/v1/profile/5`, formData).subscribe(
    //   (response) => console.log(response),
    //   (error) => console.log(error)
    // );
  }

}
