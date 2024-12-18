import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../pages/navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatoService } from '../../services/plato.service';
import { Platos } from '../../models/platos';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../../pages/footer/footer.component';

@Component({
  selector: 'app-update-plato',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, FooterComponent],
  templateUrl: './update-platos.component.html',
  styleUrls: ['./update-platos.component.css']
})
export class UpdatePlatoComponent implements OnInit {
  plato: Platos | undefined; // Datos del plato a actualizar
  platoForm: FormGroup; // Formulario reactivo para gestionar los datos del plato
  selectedFile: File | null = null; // Variable para almacenar el archivo seleccionado

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private platoService: PlatoService,
    private router: Router
  ) {
    // Inicialización del formulario reactivo con validadores
    this.platoForm = this.fb.group({
      nombre: ['', Validators.required],
      ingredientes: ['', Validators.required],
      precio: ['', Validators.required]
    });
  }

  // Carga los datos del plato basado en el ID recibido en la ruta
  cargarPlato(): void {
    const platoId = this.route.snapshot.paramMap.get('id');
    if (platoId) {
      this.platoService.getPlato(platoId).subscribe({
        next: (response: any) => {
          console.log('Respuesta del servidor:', response);
          this.plato = response.data; 
          if (this.plato) {
            this.platoForm.patchValue({
              nombre: this.plato.nombre,
              ingredientes: this.plato.ingredientes,
              precio: this.plato.precio
            });
          }
        },
        error: (error) => {
          console.error('Error al cargar los datos del plato', error);
        }
      });
    }
  }

  // Método para manejar la selección de un archivo en el input de tipo 'file'
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Almacena el archivo seleccionado
      console.log('Archivo seleccionado:', this.selectedFile.name);
    }
  }

  // Método para actualizar el plato
  actualizarPlato(): void {
    if (this.platoForm.valid && this.plato) {
      const platoId = this.route.snapshot.paramMap.get('id');
      if (platoId) {
        const formData = new FormData();
        formData.append('nombre', this.platoForm.get('nombre')?.value);
        formData.append('ingredientes', this.platoForm.get('ingredientes')?.value);
        formData.append('precio', this.platoForm.get('precio')?.value);
        
        if (this.selectedFile) {
          formData.append('imagen', this.selectedFile);
        }
        
        this.platoService.updatePlato(platoId, formData).subscribe({
          next: (response: any) => {
            console.log('Plato actualizado exitosamente:', response);
            this.router.navigate(['/platos']);
          },
          error: (error) => {
            console.error('Error al actualizar el plato', error);
          }
        });
      }
    }
  }

  ngOnInit(): void {
    this.cargarPlato(); // Carga los datos del plato al inicializar el componente
  }
}
