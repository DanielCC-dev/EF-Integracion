import { Component } from '@angular/core';
import { FooterComponent } from "../../pages/footer/footer.component";
import { NavbarComponent } from "../../pages/navbar/navbar.component";
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrdenService } from '../../services/orden.service';
import { Orden } from '../../models/orden';
import { Router } from '@angular/router';
import { Platos } from '../../models/platos';
import { PlatoService } from '../../services/plato.service';
import { NgFor, NgIf } from '@angular/common';
import { Mesa } from '../../models/mesas';

@Component({
  selector: 'app-add-orden',
  imports: [FooterComponent, NavbarComponent, NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './add-orden.component.html',
  styleUrl: './add-orden.component.css'
})
export class AddOrdenComponent {
  addOrdenForm: FormGroup;
  errorMessage: string = '';
  platillosDisponibles: Platos[] = []; 
  mesasDisponibles: Mesa[] = [];

  constructor( private fb: FormBuilder, private router: Router, private ordenService: OrdenService, private platoService: PlatoService) {
    this.addOrdenForm = this.fb.group({
      idMesa: ['', Validators.required],
      platillos: this.fb.array([]),
      estado: ['pendiente', Validators.required]
    });
  }

  get platillos(): FormArray {
    return this.addOrdenForm.get('platillos') as FormArray;
  }

  ngOnInit(): void {
    this.loadPlatos(); 
    this.cargarMesas();
  }

  cargarMesas(): void{
    this.ordenService.getMesas().subscribe(data => {
      this.mesasDisponibles = data;
    });
  }

  loadPlatos(): void {
    this.platoService.getPlatos().subscribe({
      next: (response: any) => {
        this.platillosDisponibles = response.data;
      },
      error: (error) => {
        console.error('Error al cargar los platos', error);
      }
    });
  }

  addPlatillo() {
    this.platillos.push(
      this.fb.group({
        idPlatillo: ['', Validators.required],
        cantidad: [1, [Validators.required, Validators.min(1)]],
      })
    );
  }

  removePlatillo(index: number) {
    this.platillos.removeAt(index);
  }

  addOrden() {
    if (this.addOrdenForm.invalid) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    const orden: Orden = {
      idMesa: this.addOrdenForm.get('idMesa')?.value,
      platillos: this.platillos.value,
      estado: this.addOrdenForm.get('estado')?.value
    };

    this.ordenService.addOrden(orden).subscribe({
      next: () => {
        this.router.navigate(['/ordenes']); 
      },
      error: (error: any) => {
        this.errorMessage = error.error.message || 'Error al añadir la orden. Intente de nuevo.';
      },
    });
  }
}
