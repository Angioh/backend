import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { InvoiceData } from '../invoice/invoice.service';

class SendInvoiceDto {
  email: string;
  invoice: InvoiceData;
  shipping: {
    telefono: string;
    direccion: string;
    codigoPostal: string;
    provincia: string;
  };
  total: number;
  paymentIntentId: string;
}

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send-invoice')
  async send(@Body() dto: SendInvoiceDto) {
    await this.emailService.sendInvoiceEmail(
      dto.email,
      dto.invoice,
      dto.shipping,
      dto.total,
      dto.paymentIntentId,
    );
    return { message: 'Correo enviado con éxito' };
  }
}
