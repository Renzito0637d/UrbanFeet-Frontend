export interface Reclamo {
  id: number;
  nombre: string;
  documento: string;
  domicilio: string;
  email: string;
  telefono: string;

  producto: string;
  monto: number;
  tipo: 'Reclamo' | 'Queja';
  detalle: string;
  pedido: string;

  fecha: Date;
  estado: 'Pendiente' | 'En revisión' | 'Aceptado';
}
