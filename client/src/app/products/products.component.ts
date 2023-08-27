import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {TokenService} from '../services/token.service';
import {Product, User} from '../components/models/user';
import {ApiService} from '../services/api.service';
import {environment} from '../../enviroments/enviroment';
import {ProductService} from "../services/product.service";


interface Brands {
    name: string;
    id: number;
}

interface Categories {
    name: string;
    id: number;
}

interface Favorite {
    favorite: boolean;
}

@Component({
    selector: 'app-products', templateUrl: './products.component.html', styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
    form!: FormGroup;
    favorite!: Favorite[];
    user!: User;
    userId!: number | undefined;
    brands: Brands[] | undefined;
    categories: Categories[] | undefined;
    userSessionStorage!: string | null;
    price!: number;
    quantity!: number;
    name!: string;
    text!: string;
    private baseUrlV2 = environment.apiUrlV2;
    uid!: User | null;

    //TODO sa adaug imagine in viitor
    uploadedFiles: any[] = [];


    constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private token: TokenService,
                public apiService: ApiService, private productService: ProductService) {
    }

    ngOnInit(): void {
        this.userSessionStorage = this.token.getToken();
        // it works better this.token.getUser()!!!
        this.user = this.authService.getUser();
        this.uid = this.token.getUser();
        this.userId = this.uid?.id;

        console.log('ss', this.userId);
        console.log('user', this.user);
        console.log('uid', typeof this.uid?.id);

        this.favorite = [{favorite: true}, {favorite: false},];

        this.brands = [{name: 'apple', id: 1}, {name: 'samsung', id: 2},];

        this.categories = [{name: 'phones', id: 1}, {name: 'tablets', id: 2},];

        this.form = this.fb.group({
            name: ['', Validators.required],
            price: ['', Validators.required],
            favorite: new FormControl<Favorite | null>(null, [Validators.required]),
            quantity: new FormControl<string | null>(null, [Validators.required]),
            brand: new FormControl<Brands | null>(null, [Validators.required]),
            category: new FormControl<Categories | null>(null, [Validators.required]),
            text: new FormControl<string | null>(null, [Validators.required]),
        });
    }

    onSubmit() {
        console.log(this.form.value);

        // console.log('fav : ', this.price)
        const newProduct: Product = {
            favorite: this.favorite = this.form.value.favorite.favorite,
            price: this.price = this.form.value.price,
            name: this.name = this.form.value.name,
            quantity: this.quantity = this.form.value.quantity,
            brand: this.brands = this.form.value.brand.name,
            category: this.categories = this.form.value.category.name,
            text: this.categories = this.form.value.text,
            uid: this.userId
        }
        // console.log('n p : ', newProduct)

        // this.apiService.postProduct(`product`, this.userId, newProduct)

        if (this.form.valid) {
            console.log('IF ', this.form.value);
            this.productService.postProduct(`product`, this.userId, newProduct).subscribe(item => {
                console.log(item)
            })
            this.router.navigate(['/products/product-list']);
        }
    }
}
