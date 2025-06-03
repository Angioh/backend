import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rueda {
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

  @Column('decimal')
  diametro:number;

  @Column('decimal')
  dureza:number;
  
  @Column()
  imagen_url:string;

  @Column()
  imagen_url2:string;

  @Column()
  cantidad:number;
}
