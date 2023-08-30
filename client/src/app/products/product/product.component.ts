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
    })
  }
}
