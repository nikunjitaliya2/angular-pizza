import {Component, DoCheck, OnInit} from '@angular/core';
import { Router} from "@angular/router";
import {IUser} from "../../interfaces/interface";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , DoCheck{
  userDetails: IUser
  cartDetails = ''
  isLogged: boolean = false
  isAdmin = false

  constructor(private router: Router) {
    this.userDetails = JSON.parse(<string>localStorage.getItem('user-details'))

  }

  ngOnInit(): void {
    if (this.userDetails) {
      this.isLogged = true
      this.isAdmin = this.userDetails.role === 'admin'
    }
  }

  logoutRemove() {
    localStorage.removeItem('user-details')
    localStorage.removeItem('cart')
    this.router.navigateByUrl('/auth/login')
  }

  ngDoCheck(): void {
    this.cartDetails = JSON.parse(<string>localStorage.getItem('cart'))?.length
  }

  toggleMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menu');
    if (menuToggle && menu) {
      menuToggle.classList.toggle('active');
      menu.classList.toggle('hidden');
    }
  }
}
