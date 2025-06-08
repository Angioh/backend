// src/invoice/invoice.service.ts

import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { WritableStreamBuffer } from 'stream-buffers';

export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}
export interface InvoiceData {
  number: string;
  date: string;
  customer: { name: string; email: string };
  items: InvoiceItem[];
}

@Injectable()
export class InvoiceService {
  async generateInvoice(data: InvoiceData): Promise<Buffer> {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const stream = new WritableStreamBuffer();
    doc.pipe(stream);

    doc.fontSize(20).text(`Factura #${data.number}`, { align: 'right' });
    doc.moveDown();
    doc.fontSize(12).text(`Fecha: ${data.date}`);
    doc.text(`Cliente: ${data.customer.name}`);
    doc.moveDown();

    doc.text('Descripción          Cantidad    Precio    Subtotal');
    let total = 0;

    data.items.forEach(it => {
      // 1. Convertir a número (si viniese como string)
      const quantity = Number(it.quantity);
      const price    = Number(it.price);
      // 2. Calcular subtotal
      const subtotal = quantity * price;
      total += subtotal;
      // 3. Ahora price.toFixed() funciona sin error
      doc.text(
        `${it.description.padEnd(20)} ` +
        `${quantity.toString().padEnd(10)} ` +
        `${price.toFixed(2).padEnd(10)} ` +
        `${subtotal.toFixed(2)}`
      );
    });

    doc.moveDown();
    doc.text(`Total: €${total.toFixed(2)}`, { align: 'right' });
    doc.end();

    return stream.getContents() as Buffer;
  }
}
