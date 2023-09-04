import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../components/models/user';
import {Product} from "../../components/models/products";
import {environment} from '../../../enviroments/enviroment';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {TokenService} from '../../services/token.service';
import {ApiService} from '../../services/api.service';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  user!: User;
  userId!: number | undefined;
  // productId!: any;
  product!: Product | undefined;
  userSessionStorage!: string;
  pid!: string;
  // product: Product;
  isEditable = false;
  name!: string;
  price!: number;
  brand!: string;
  favorite!: string;
  quantity!: number;
  category!: string;
  codebar!: string;
  text!: string;
  message = '';
  // value!: string;


  constructor(private router: Router, private authService: AuthService,
              private token: TokenService,
              public productService: ProductService,
              private route: ActivatedRoute,) {
  }

  ngOnInit(){
    this.user = this.token.getUser();
    this.userId = this.user.id;
    this.userSessionStorage = this.token.getToken() as string;
    console.log('user', this.user);
    console.log('uid',typeof this.user.id);
    console.log('session storage', this.userSessionStorage);

    this.route.paramMap.subscribe(params => {
      // console.log('params ', params)
      this.pid = params?.get('id') as string;
      // this.moduleId = moduleId;
      // this.questionId = params.get('qid') as string;
      // Retrieve state data
      // const stateData = history.state;
      console.log('pid ', this.pid)
      // console.log('pid ', stateData)

      // console.log('Module ID:', typeof moduleId);
      // console.log('Question ID:', this.questionId);
      // console.log('State Data:', stateData);
    });


    this.getProduct();
  }

  getProduct(){
    this.productService.getProductId('product', this.userSessionStorage, this.userId, this.pid).subscribe(item =>{
      console.log('item : ', item)
      this.product = item;
        this.name = this.product.name;
        this.price = this.product.price;
        this.brand = this.product.brand;
        this.favorite = this.product?.favorite;
        this.quantity = this.product.quantity;
        this.category = this.product.category;
        this.codebar = this.product.codebar as string;
        this.text = this.product.text;
    })
  }

  toggleEdit() {
    this.isEditable = !this.isEditable;
  }

  updateProduct(){
    console.log('name', this.name)

    const updatedProduct: Product = {
      favorite: this.favorite ,
      price: this.price ,
      name: this.name ,
      quantity: this.quantity ,
      brand: this.brand ,
      category: this.category ,
      text: this.text,
      uid: this.userId,
      pid: this.pid
    }

    this.productService.updateProduct(`product`, this.userId, updatedProduct, this.pid)
      .subscribe(
        item => {
          console.log('item product ',item);
          this.router.navigate(['/products/product-list']);
        },
        error => {
          console.log('Error:', error);
          this.message = 'Something went wrong';
        }
      );
  }

  delteProduct(id: any){
    console.log('id', id)
    console.log('pid', this.pid)
    console.log('type of id ', typeof id)
    this.productService.deleteProduct('product', this.userId, this.pid)
      .subscribe(
        item => {
          console.log('item product ',item);
          this.router.navigate(['/products/product-list']);
        },
        error => {
          console.log('Error:', error);
          this.message = 'Something went wrong';
        }
      );
  }
}
