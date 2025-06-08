import { InvoiceModule } from './invoice/invoice.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

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

import { EmailModule } from './email/email.module';

@Module({
  imports: [
    InvoiceModule,
    // Configuración global de variables de entorno
    ConfigModule.forRoot({ isGlobal: true }),

    // Stripe y Base de datos
    StripeModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),

    // Módulos de negocio
    UsersModule,
    AuthModule,
    TablasModule,
    RuedasModule,
    TornillosModule,
    EjesModule,
    RodamientosModule,
    LijasModule,
    PedidosModule,

    // Módulo de facturas (genera el PDF)
    InvoiceModule,

    // Módulo de email (envía el PDF como adjunto)
    EmailModule,

    // Configuración del MailerModule para envío de correos
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT
          ? parseInt(process.env.SMTP_PORT, 10)
          : undefined,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
      defaults: {
        from: `"Tu Empresa" <${process.env.SMTP_USER}>`,
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: { strict: true },
      },
    }),
  ],
})
export class AppModule {}
