export interface Reclamo {
  id: number;

  // Datos del consumidor
  nombre: string;
  documento: string;
  domicilio: string;
  email: string;
  telefono: string;

  // Datos del reclamo
  producto: string;
  monto: number;
  tipo: string;
  detalle: string;
  pedido: string;

  fecha: string; // ISO date string
}