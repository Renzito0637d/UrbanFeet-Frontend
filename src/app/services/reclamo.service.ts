import { Injectable } from '@angular/core';
import { Reclamo } from '../models/reclamo.model';

@Injectable({
  providedIn: 'root'
})
export class ReclamoService {

  private reclamos: Reclamo[] = [

    {
      id: 1,
      nombre: "Juan Pérez",
      documento: "12345678",
      domicilio: "Av. Siempre Viva 123",
      email: "juan@example.com",
      telefono: "987654321",
      producto: "Zapatillas Urban X",
      monto: 150,
      tipo: "Reclamo",
      detalle: "El producto llegó dañado",
      pedido: "Cambio de producto",
      fecha: new Date(),
      estado: "Pendiente"
    },
    {
      id: 2,
      nombre: "Ana Torres",
      documento: "45678912",
      domicilio: "Calle Sol #45",
      email: "ana@example.com",
      telefono: "981234567",
      producto: "UrbanFit Air",
      monto: 210,
      tipo: "Queja",
      detalle: "Atención muy lenta",
      pedido: "Mejor servicio",
      fecha: new Date(),
      estado: "En revisión"
    },
    {
      id: 3,
      nombre: "Luis Ramírez",
      documento: "74859632",
      domicilio: "Jr. Las Palmeras 231",
      email: "luis.ramirez@example.com",
      telefono: "912345678",
      producto: "UrbanRun Pro",
      monto: 180,
      tipo: "Reclamo",
      detalle: "La talla no coincide con la descripción",
      pedido: "Cambio por una talla más grande",
      fecha: new Date(),
      estado: "Pendiente"
    },
    {
      id: 4,
      nombre: "María López",
      documento: "10293847",
      domicilio: "Av. Primavera 567",
      email: "maria.lopez@example.com",
      telefono: "987112233",
      producto: "Urban Air Classic",
      monto: 250,
      tipo: "Queja",
      detalle: "El empaque llegó abierto",
      pedido: "Revisión de control de calidad",
      fecha: new Date(),
      estado: "En revisión"
    },
    {
      id: 5,
      nombre: "Carlos Paredes",
      documento: "56473829",
      domicilio: "Calle Luna #654",
      email: "carlos.paredes@example.com",
      telefono: "944556677",
      producto: "UrbanFlex 2.0",
      monto: 175,
      tipo: "Reclamo",
      detalle: "Defecto en la suela",
      pedido: "Reposición del producto",
      fecha: new Date(),
      estado: "Pendiente"
    },
    {
      id: 6,
      nombre: "Patricia Gómez",
      documento: "84736251",
      domicilio: "Pasaje Azul 321",
      email: "patricia.gomez@example.com",
      telefono: "955667788",
      producto: "Urban Step Kids",
      monto: 120,
      tipo: "Queja",
      detalle: "Demora en la entrega",
      pedido: "Compensación por retraso",
      fecha: new Date(),
      estado: "En revisión"
    },
    {
      id: 7,
      nombre: "Ricardo Medina",
      documento: "72635481",
      domicilio: "Av. Central 987",
      email: "ricardo.medina@example.com",
      telefono: "933224455",
      producto: "UrbanSport Elite",
      monto: 320,
      tipo: "Reclamo",
      detalle: "Producto equivocado recibido",
      pedido: "Envió del producto correcto",
      fecha: new Date(),
      estado: "Pendiente"
    },
    {
      id: 8,
      nombre: "Tatiana Quispe",
      documento: "90817263",
      domicilio: "Calle Robles 120",
      email: "tatiana.quispe@example.com",
      telefono: "922334455",
      producto: "UrbanComfy",
      monto: 140,
      tipo: "Queja",
      detalle: "Color distinto al publicado",
      pedido: "Cambio por el color solicitado",
      fecha: new Date(),
      estado: "En revisión"
    } 
  ];

  constructor() {}

  obtenerReclamos(): Reclamo[] {
    return [...this.reclamos];
  }

  eliminar(id: number) {
    this.reclamos = this.reclamos.filter(r => r.id !== id);
  }

  cambiarEstado(id: number, nuevoEstado: string) {
    const r = this.reclamos.find(rc => rc.id === id);
    if (r) {
      r.estado = nuevoEstado as any;
    }

    // Si está aceptado, lo ocultamos del mantenimiento
    if (nuevoEstado === "Aceptado") {
      this.reclamos = this.reclamos.filter(rc => rc.estado !== "Aceptado");
    }
  }

  filtrar(estado: string, tipo: string): Reclamo[] {
    return this.reclamos.filter(r => {
      const cumpleEstado = estado === "Todos" || r.estado === estado;
      const cumpleTipo = tipo === "Todos" || r.tipo === tipo;
      return cumpleEstado && cumpleTipo;
    });
  }
}
