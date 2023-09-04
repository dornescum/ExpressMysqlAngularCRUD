import {Component, HostListener, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {TokenService} from '../../../services/token.service';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  items: MenuItem[] = [];
  isMobileView: boolean = false;
  user!: {};
  userSessionStorage: any;

  constructor( private token: TokenService, private authService: AuthService,private router: Router, private cdr: ChangeDetectorRef) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobileView = window.innerWidth <= 600;
  }

  ngOnInit() {
    this.onResize(null); // Initialize isMobileView on component load


    this.userSessionStorage = this.token.getToken();
    if(!this.userSessionStorage){
      this.router.navigate(['auth/login']);
      // window.location.reload();
    }
    this.cdr.detectChanges();
    if(!this.userSessionStorage){
      this.items= []
    } else {
      this.items = [
        {
          label: 'Profile',
          icon: 'pi pi-user',
          routerLink: '/auth/profile'
        },
        // {
        //   label: 'Quizzes',
        //   icon: 'pi pi-user',
        //   routerLink: '/quiz'
        // },
        {
          label: 'Api',
          icon: 'pi pi-user',
          routerLink: '/api-feature'
        },
        {
          label: 'Add Product',
          icon: 'pi pi-user',
          routerLink: '/products'
        },
        {
          label: 'Products',
          icon: 'pi pi-user',
          routerLink: '/products/product-list'
        },
        {
          label: 'Img',
          icon: 'pi pi-user',
          routerLink: '/img-testing'
        },
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          routerLink: '/auth/login',
          command: () => {
            this.token.clearStorage()
          }
        }
      ];
    }

  }
}
