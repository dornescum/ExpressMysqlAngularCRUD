import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {TokenService} from "../../services/token.service";
import {ApiService} from "../../services/api.service";
import {Product, User} from "../../components/models/user";
import {ProductService} from "../../services/product.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  user!: User;
  userId!: any;
  products: Product[]= [];
  userSessionStorage!: string;


  constructor( private router: Router, private authService: AuthService,
              private token: TokenService,
              public productService: ProductService) {
  }

  ngOnInit() {
    this.user = this.token.getUser();
    this.userId = this.user.id;
    this.userSessionStorage = this.token.getToken() as string;

    console.log('user', this.user);
    console.log('uid', this.user.id);
    console.log('session storage',typeof this.userSessionStorage);
    this.getProducts();
  }

  getProducts(){
    this.productService.getAllProducts('product', this.userSessionStorage).subscribe((items:  any) =>{
      console.log('items', items)
    })
  }

}
