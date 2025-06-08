import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import {
  InvoiceService,
  InvoiceData,
  InvoiceItem,
} from '../invoice/invoice.service';

interface ShippingInfo {
  telefono: string;
  direccion: string;
  codigoPostal: string;
  provincia: string;
}

@Injectable()
export class EmailService {
  constructor(
    private readonly mailer: MailerService,
    private readonly invoiceService: InvoiceService,
  ) {}

  async sendInvoiceEmail(
    to: string,
    invoice: InvoiceData,
    shipping: ShippingInfo,
    total: number,
    paymentIntentId: string,
  ) {
    // 1. Generar PDF
    const pdf = await this.invoiceService.generateInvoice(invoice);

    // 2. Enviar email
    await this.mailer.sendMail({
      to,
      subject: `Factura #${invoice.number}`,
      template: 'invoice', // busca invoice.hbs en /templates
      context: {
        invoiceNumber: invoice.number,
        date: invoice.date,
        customerName: invoice.customer.name,
        items: invoice.items,
        shipping,
        total,
        paymentIntentId,
      },
      attachments: [
        {
          filename: `factura-${invoice.number}.pdf`,
          content: pdf,
        },
      ],
    });
  }
}
