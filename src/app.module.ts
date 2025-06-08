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
import { PedidosModule } from './pedidos/pedidos.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    StripeModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    TablasModule,
    RuedasModule,
    TornillosModule,
    EjesModule,
    RodamientosModule,
    LijasModule,
    PedidosModule,
  ],
})
export class AppModule {}
