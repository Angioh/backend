import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum PedidoEstado {
  RECIBIDO = 'recibido',
  ENVIADO = 'enviado',
  ENTREGADO = 'entregado',
}

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  direccion: string;

  @Column()
  telefono: string;

  @Column({
    type: 'enum',
    enum: PedidoEstado,
    default: PedidoEstado.RECIBIDO,
  })
  estado: PedidoEstado;

  @Column()
  cantidad: number;

  @Column()
  nombre_producto: string;
}
