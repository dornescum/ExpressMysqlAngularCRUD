import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {TokenService} from "../../services/token.service";
import {User} from "../../components/models/user";
import {Product} from "../../components/models/products";
import {ProductService} from "../../services/product.service";



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
  mobile!:boolean;
  searchValue!: string;



  constructor( private router: Router, private authService: AuthService,
              private token: TokenService,
              public productService: ProductService) {
  }

  ngOnInit() {
    this.user = this.token.getUser();
    this.userId = this.user.id;
    this.userSessionStorage = this.token.getToken() as string;
    this.getProducts();
  }

  getProducts(){
    this.loading = true;
    this.productService.getAllProducts('product', this.userSessionStorage, this.userId).subscribe((items:  Product[]) =>{
        if (items?.length === undefined){
          this.message = 'No products';
        }
      this.loading = false;
      this.products = items;
        this.searchValue = '';
    },
      (error) => {
        if (error.status === 429) {
          this.router.navigate(['/error/429']);
        }
        console.log('Error fetching products:', error);
        this.errorMsg = 'Something went wrong';
      })
  }


  goToProductId(id: any){
    this.router.navigate(['products/product/', id])
  }

  getSearchValue (){
     this.productService.getSearch('search', this.userSessionStorage, this.userId, this.searchValue)
      .subscribe(
        items => {
          console.log('item product ',items);
          if (items?.length > 0){
            // const ids = items.map(item => item.id).join(',');
            // this.router.navigate(['/products/search-products'],  {queryParams: { ids }});
            this.products = items;
          } else {

            this.message = 'nothing found ...';
            setTimeout(()=>{
              this.message = '';
            }, 1000)
            // TODO add dialog primeng
            this.searchValue = '';
          }

        },
        error => {
          console.log('Error:', error);
          this.message = 'Something went wrong';
        }
      );
  }

}
