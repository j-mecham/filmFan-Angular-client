import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    private router: Router
  ){}

  ngOnInit(): void{

  }

  goToMovies(): void {
    this.router.navigate(['movies']);
  }

  goToProfile(): void {
    this.router.navigate(['profile'])
  }

  logout(): void {
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
    this.router.navigate(['welcome']);
  }
  

}
