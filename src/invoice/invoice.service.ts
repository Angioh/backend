import { Injectable } from '@nestjs/common';
import * as PDFKit from 'pdfkit';
import { WritableStreamBuffer } from 'stream-buffers';

interface InvoiceItem { description: string; quantity: number; price: number; }
export interface InvoiceData {
  number: string;
  date: string;
  customer: { name: string; email: string; };
  items: InvoiceItem[];
}

@Injectable()
export class InvoiceService {
  async generateInvoice(data: InvoiceData): Promise<Buffer> {
    const doc = new PDFKit({ size: 'A4', margin: 50 });
    const stream = new WritableStreamBuffer();

    doc.pipe(stream);

    // Cabecera
    doc.fontSize(20).text(`Factura #${data.number}`, { align: 'right' });
    doc.moveDown();
    doc.fontSize(12).text(`Fecha: ${data.date}`);
    doc.text(`Cliente: ${data.customer.name}`);
    doc.moveDown();

    // Tabla de items
    doc.text('Descripción         Cantidad     Precio     Subtotal');
    doc.moveDown(0.5);
    let total = 0;
    data.items.forEach(item => {
      const subtotal = item.quantity * item.price;
      total += subtotal;
      doc.text(`${item.description.padEnd(20)} ${item.quantity.toString().padEnd(10)} ${item.price.toFixed(2).padEnd(10)} ${subtotal.toFixed(2)}`);
    });
    doc.moveDown();
    doc.text(`Total: €${total.toFixed(2)}`, { align: 'right' });

    doc.end();
    return stream.getContents() as Buffer;
  }
}
