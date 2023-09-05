import {Component, OnInit} from '@angular/core';
import {User} from '../../components/models/user';
import {Product} from "../../components/models/products";
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {TokenService} from '../../services/token.service';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  user!: User;
  userId!: number | undefined;
  product!: Product | undefined;
  userSessionStorage!: string;
  pid!: string;
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


  constructor(private router: Router, private authService: AuthService,
              private token: TokenService,
              public productService: ProductService,
              private route: ActivatedRoute,) {
  }

  ngOnInit(){
    this.user = this.token.getUser();
    this.userId = this.user.id;
    this.userSessionStorage = this.token.getToken() as string;
    this.route.paramMap.subscribe(params => {
      this.pid = params?.get('id') as string;
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

  // toggleEdit() {
  //   this.isEditable = !this.isEditable;
  // }

  updateProduct(){
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

  deleteProduct(id: any){

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
