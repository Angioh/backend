import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { InvoiceService, InvoiceData } from '../invoice/invoice.service';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailer: MailerService,
    private readonly invoiceService: InvoiceService,
  ) {}

  async sendInvoiceEmail(to: string, invoice: InvoiceData) {
    // Generar PDF
    const pdfBuffer = await this.invoiceService.generateInvoice(invoice);

    // Enviar correo
    await this.mailer.sendMail({
      to,
      subject: `Factura #${invoice.number}`,
      template: 'invoice',       // archivo templates/invoice.hbs
      context: {                  // contexto para la plantilla
        customerName: invoice.customer.name,
        invoiceNumber: invoice.number,
        date: invoice.date,
      },
      attachments: [
        {
          filename: `factura-${invoice.number}.pdf`,
          content: pdfBuffer,
        },
      ],
    });
  }
}
