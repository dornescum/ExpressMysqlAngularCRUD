import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {TokenService} from "../../services/token.service";
import {ApiService} from "../../services/api.service";
import {User} from "../../components/models/user";
import {Product} from "../../components/models/products";
import {ProductService} from "../../services/product.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  user!: User;
  userId!: number | undefined;
  // productId!: any;
  products: Product[]= [];
  userSessionStorage!: string;
  message:string = '';
  errorMsg='';
  loading = false;
  // value='2222432';



  constructor( private router: Router, private authService: AuthService,
              private token: TokenService,
              public productService: ProductService) {
  }

  ngOnInit() {
    this.user = this.token.getUser();
    this.userId = this.user.id;
    this.userSessionStorage = this.token.getToken() as string;
    //
    // console.log('user', this.user);
    // console.log('uid',typeof this.user.id);
    // console.log('session storage', this.userSessionStorage);
    this.getProducts();
  }

  getProducts(){
    this.loading = true;
    this.productService.getAllProducts('product', this.userSessionStorage, this.userId).subscribe((items:  Product[]) =>{
      console.log('items', items)
      console.log('items', items?.length)
        if (items?.length === undefined){
          this.message = 'No products';
        }
      this.loading = false;
      this.products = items;
      // if (this.products.length <1){
      //   this.message = 'No products';
      // }
    },
      (error) => {
        if (error.status === 429) {
          // Redirect to a different page, maybe a rate limit warning page.
          this.router.navigate(['/error/429']);
        }
        console.log('Error fetching products:', error);
        this.errorMsg = 'Something went wrong';
      })
  }


  goToProductId(id: any){
    console.log('go to product id: ', id)

    // this.productService.getProductId('product', this.userSessionStorage, this.userId, id).subscribe(item =>{
    //   console.log('item : ', item)
    // })
    this.router.navigate(['products/product/', id])
  }

}
