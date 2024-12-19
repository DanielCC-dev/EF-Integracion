import { Component } from '@angular/core';
import { NavbarComponent } from "../../pages/navbar/navbar.component";
import { FooterComponent } from "../../pages/footer/footer.component";
import { Mesa } from '../../models/mesas';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrdenService } from '../../services/orden.service';
import { PlatoService } from '../../services/plato.service';
import { NgFor, NgIf } from '@angular/common';
import { Orden } from '../../models/orden';
import { ChatComponent } from "../../pages/chat/chat.component";

@Component({
  selector: 'app-gestion-ordenes',
  imports: [NavbarComponent, FooterComponent, FormsModule, ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './gestion-ordenes.component.html',
  styleUrl: './gestion-ordenes.component.css'
})
export class GestionOrdenesComponent {
  mesaId: string = '';
  mesasDisponibles: Mesa[] = [];
  ordenEncontrada: Orden | undefined;
  ordenForm: FormGroup;
  errorMessage: string = ''
  platoSeleccionado: any = null;

  constructor(private fb: FormBuilder, private router: Router, private ordenService: OrdenService, private platoService: PlatoService) {
    this.ordenForm = this.fb.group({
      idMesa: ['', Validators.required],
      platillos: this.fb.array([]),
      estado: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.cargarMesas();
  }

  cargarMesas(): void {
    this.ordenService.getMesas().subscribe(data => {
      this.mesasDisponibles = data;
      console.log(this.mesasDisponibles);
    });
  }

  buscarOrden(): void {
    console.log('ID de mesa:', this.mesaId); 
    if (this.mesaId) {
      this.ordenService.getOrden(this.mesaId).subscribe({
        next: (response: any) => {
          this.ordenEncontrada = response.orden;
          this.errorMessage = '';
          console.log(this.ordenEncontrada)
        },
        error: (error) => {
          if (error.status === 404) {
            //console.error('Orden no encontrada');
            this.errorMessage = 'La mesa no tiene ninguna orden pendiente.';
          } else {
            //console.error('Error al cargar los datos de la categoría', error);
            this.errorMessage = 'Ocurrió un error al intentar obtener los datos.';
          }
          this.ordenEncontrada = undefined;
        }
      });
    } else {
      alert('Por favor ingresa un ID de mesa');
    }
  }

  mostrarInfoPlato(idPlatillo: string): void {
    this.platoSeleccionado = null;
    this.platoService.getPlato(idPlatillo).subscribe({
      next: (response: any) => {
        this.platoSeleccionado = response.data;
        console.log('Plato seleccionado:', this.platoSeleccionado);
      },
      error: (error) => {
        console.error('Error al obtener la información del plato:', error);
      }
    });
  }
  
  actualizarEstadoOrden(nuevoEstado: "pendiente" | "entregado" | "cancelado"): void {
    if (this.ordenEncontrada && this.ordenEncontrada._id) {
      const ordenActualizada: Orden = {
        ...this.ordenEncontrada,
        estado: nuevoEstado,
      };
      this.ordenService.updateOrden(this.ordenEncontrada._id, ordenActualizada).subscribe({
        next: (response) => {
          //console.log('Estado de la orden actualizado:', response);
          this.buscarOrden(); 
        },
        error: (error) => {
          //console.error('Error al actualizar el estado de la orden:', error);
          alert('Hubo un error al intentar actualizar el estado de la orden.');
        },
      });
    } else {
      console.error('Error: El ID de la orden no está definido.');
      alert('No se pudo actualizar el estado porque el ID de la orden no está definido.');
    }
  }
  
  eliminarOrden(): void {
    if (this.ordenEncontrada && this.ordenEncontrada._id && this.ordenEncontrada.estado === 'cancelado') {
      this.ordenService.deleteOrden(this.ordenEncontrada._id).subscribe({
        next: () => {
          //console.log('Orden eliminada correctamente');
          this.ordenEncontrada = undefined;
        },
        error: (error) => {
          console.error('Error al eliminar la orden:', error);
          alert('Hubo un error al intentar eliminar la orden.');
        }
      });
      this.router.navigate(['/ordenes']).then(() => {
        window.location.reload(); 
      });
    } else {
      console.error('Error: El ID de la orden no está definido o el estado no es "cancelado".');
      alert('Solo se pueden eliminar órdenes con estado "cancelado".');
    }
  }
  
  
}
