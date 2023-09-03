import {Component, OnInit} from '@angular/core';
import {Product} from "../../components/models/products";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {TokenService} from "../../services/token.service";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  products: Product[]= [];
  message:string = '';
  errorMsg='';
  loading = false;

  constructor( private router: Router, private authService: AuthService,
               private token: TokenService,
               public productService: ProductService) {
  }

  ngOnInit() {
    this.getProductsNoSecurity();
  }

  getProductsNoSecurity(){
    this.loading = true;
    this.productService.getApiProducts('api',).subscribe((items:  Product[]) =>{
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
}
