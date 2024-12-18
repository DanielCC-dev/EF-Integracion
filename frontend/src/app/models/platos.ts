export class Platos {
    _id?: string = '';
    nombre: string;
    ingredientes: string;
    precio: number;
    imagen: string;


    constructor(nombre: string, ingredientes: string, precio: number, imagen: string) {
        this.nombre = nombre;
        this.ingredientes = ingredientes;
        this.precio = precio;
        this.imagen = imagen;
    }
}