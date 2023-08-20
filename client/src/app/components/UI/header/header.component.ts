import {Component, HostListener, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  items: MenuItem[] = [];

  isMobileView: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobileView = window.innerWidth <= 600;
  }

  ngOnInit() {
    this.onResize(null); // Initialize isMobileView on component load
    this.items = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        routerLink: '/profile'
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          // Implement your logout logic here
        }
      }
    ];
  }
}
