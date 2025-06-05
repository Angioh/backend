import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  CLIENTE = 'cliente',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENTE,
  })
  role: UserRole;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  direccion: string;

  @Column({ type: 'varchar', length: 9, nullable: true, default: null })
  telefono: string
}
