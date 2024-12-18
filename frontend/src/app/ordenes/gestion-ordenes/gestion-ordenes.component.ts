import { Component } from '@angular/core';
import { NavbarComponent } from "../../pages/navbar/navbar.component";
import { FooterComponent } from "../../pages/footer/footer.component";

@Component({
  selector: 'app-gestion-ordenes',
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './gestion-ordenes.component.html',
  styleUrl: './gestion-ordenes.component.css'
})
export class GestionOrdenesComponent {

}
