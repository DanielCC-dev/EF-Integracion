import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { PlatoService } from '../../services/plato.service';
import { Platos } from '../../models/platos';
import { NavbarComponent } from '../../pages/navbar/navbar.component';
import { FooterComponent } from '../../pages/footer/footer.component';

@Component({
  selector: 'app-add-platos',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NavbarComponent, FooterComponent],
  templateUrl: './add-platos.component.html',
  styleUrl: './add-platos.component.css',
})
export class AddPlatosComponent {
  addPlatoForm: FormGroup;
  imagePreview: string | null = null; // Vista previa de la imagen
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router, private dataAdd: PlatoService) {
    this.addPlatoForm = this.fb.group({
      nombre: ['', Validators.required],
      ingredientes: ['', Validators.required],
      precio: ['', Validators.required],
      imagen: ['', Validators.required], // Este campo contendrá la cadena Base64
    });
  }

  onFileSelect(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      // Generar vista previa y codificar la imagen en Base64
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string; // Vista previa
        this.addPlatoForm.patchValue({ imagen: this.imagePreview }); // Asignar Base64 al formulario
      };
      reader.readAsDataURL(file);
    }
  }

  addPlato(): void {
    if (this.addPlatoForm.invalid) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    const plato: Platos = {
      nombre: this.addPlatoForm.get('nombre')?.value,
      ingredientes: this.addPlatoForm.get('ingredientes')?.value,
      precio: this.addPlatoForm.get('precio')?.value,
      imagen: this.addPlatoForm.get('imagen')?.value, // Imagen como Base64
    };

    this.dataAdd.addPlato(plato).subscribe({
      next: () => {
        this.router.navigate(['/platos']);
      },
      error: (error: any) => {
        this.errorMessage = error.error.message || 'Error al añadir. Intente de nuevo.';
      },
    });
  }
}
