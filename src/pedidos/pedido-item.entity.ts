import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Pedido } from './pedido.entity';

@Entity()
export class PedidoItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productoId: number;

  @Column()
  nombre: string;

  @Column('decimal')
  precio: number;

  @Column()
  imagen_url: string;

  @Column()
  tipo: string;

  @Column()
  cantidad: number;

  @ManyToOne(() => Pedido, (pedido) => pedido.items, { onDelete: 'CASCADE' })
  pedido: Pedido;
}
