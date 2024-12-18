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
  styleUrl: './update-platos.component.css'
})
export class UpdatePlatoComponent implements OnInit {
  plato: Platos | undefined;
  platoForm: FormGroup;

  constructor(
    private fb: FormBuilder, private route: ActivatedRoute, private platoService: PlatoService, private router: Router
  ) {
    this.platoForm = this.fb.group({
      nombre: ['', Validators.required],
      ingredientes: ['', Validators.required],
      precio: ['', Validators.required],
      imagen: [''],
    })
  }

  cargarPlato() {
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
                  precio: this.plato.precio,
                  imagen: this.plato?.imagen,
              });
          }
      },
        error: (error) => {
          console.error('Error al cargar los datos del plato', error);
        }
      });
    }
  }

  ngOnInit(): void {
    this.cargarPlato();
  }

  actualizarPlato(): void {
    if (this.platoForm.valid) {
      const platoId = this.route.snapshot.paramMap.get('id');
      if (platoId) {
        const updatedPlato = {
          ...this.platoForm.value,
          imagen: this.imagenBase64 || null,
        };
  
        this.platoService.updatePlato(platoId, updatedPlato).subscribe({
          next: (response: any) => {
            console.log('Plato actualizado exitosamente');
            this.router.navigate(['/platos']);
          },
          error: (error) => {
            console.error('Error al actualizar el plato', error);
          }
        });
      }
    }
  }

  imagenBase64: string | null = null;

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
  
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        this.imagenBase64 = reader.result as string; 
        //console.log('Imagen en Base64:', this.imagenBase64);
      };
  
      reader.readAsDataURL(file); 
    }
  }

}
