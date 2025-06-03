import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TablasModule } from './tablas/tablas.module';
import { RuedasModule } from './ruedas/ruedas.module';
import { TornillosModule } from './tornillos/tornillos.module';
import { EjesModule } from './ejes/ejes.module';
import { RodamientosModule } from './rodamientos/rodamientos.module';
import { LijasModule } from './lijas/lijas.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true, // No usar en producción
    }),
    UsersModule,
    AuthModule,
    TablasModule,
    RuedasModule,
    TornillosModule,
    EjesModule,
    RodamientosModule,
    LijasModule,
    // Otros módulos
  ],
})
export class AppModule {}
