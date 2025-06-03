import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tabla {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column('decimal')
  precio: number;

  @Column()
  marca:string;

  @Column()
  color:string;

  @Column()
  tamanho:string;
  
  @Column()
  imagen_url:string;

  @Column()
  imagen_url2:string;

  @Column()
  cantidad:number;
}
