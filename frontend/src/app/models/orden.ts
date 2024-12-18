export class Orden {
    idMesa: string;
    platillos: { idPlatillo: string; cantidad: number }[];
    estado: "pendiente" | "entregado" | "cancelado";
    // createdAt?: Date;
    // updatedAt?: Date;

    constructor(
        idMesa: string,
        platillos: { idPlatillo: string; cantidad: number }[],
        estado: "pendiente" | "entregado" | "cancelado" = "pendiente"
    ) {
        this.idMesa = idMesa;
        this.platillos = platillos;
        this.estado = estado;
    }
}
