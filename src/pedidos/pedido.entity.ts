import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { PedidoItem } from './pedido-item.entity';

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


  @Column()
  userId: number;

  @CreateDateColumn({ name: 'fechaCreacion', type: 'timestamp' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fechaActualizacion', type: 'timestamp' })
  fechaActualizacion: Date;

  @OneToMany(() => PedidoItem, (item) => item.pedido, {
    cascade: true,
    eager: true,
  })
  items: PedidoItem[];
}
