import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { InvoiceModule } from '../invoice/invoice.module';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';

@Module({
  imports: [
    InvoiceModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
      defaults: {
        from: `"KickFlip Shop" <${process.env.SMTP_USER}>`,
      },
      template: {
        dir: join(__dirname, '../templates'),
        // PASAMOS directamente el objeto de helpers como primer argumento
        adapter: new HandlebarsAdapter(
          { multiply: (a: number, b: number) => (a * b).toFixed(2) }
        ),
        options: { strict: true },
      },
    }),
  ],
  providers: [EmailService],
  controllers: [EmailController],
  exports: [EmailService],
})
export class EmailModule {}
