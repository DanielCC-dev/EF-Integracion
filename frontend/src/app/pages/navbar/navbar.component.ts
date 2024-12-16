import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-navbar',
    imports: [RouterOutlet],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router, private cookieService: CookieService) {}

  logout() {
    this.cookieService.delete('jwt_token');
    
    this.router.navigate(['/']);
  }

  isActive(route: string): boolean {
    if (route === '/updateMesero' && this.router.url.includes('/updateMesero')) {
      return true;
    }
    if (route === '/updateCliente' && this.router.url.includes('/updateCliente')) {
      return true;
    }
    if (route === '/updateCategoria' && this.router.url.includes('/updateCategoria')) {
      return true;
    }
    return this.router.url === route;
  }
}
