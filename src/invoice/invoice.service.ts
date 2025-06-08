
import { Injectable } from '@nestjs/common';
// Importación corregida de PDFKit:
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
    // Ahora sí podemos instanciar correctamente:
    const doc = new PDFDocument({ size: 'A4', margin: 50 });  // :contentReference[oaicite:0]{index=0}
    const stream = new WritableStreamBuffer();

    doc.pipe(stream);

    // --- resto de la generación de la factura ---
    doc.fontSize(20).text(`Factura #${data.number}`, { align: 'right' });
    doc.moveDown();
    doc.fontSize(12).text(`Fecha: ${data.date}`);
    doc.text(`Cliente: ${data.customer.name}`);
    doc.moveDown();

    doc.text('Descripción          Cantidad    Precio    Subtotal');
    let total = 0;
    data.items.forEach(it => {
      const subtotal = it.quantity * it.price;
      total += subtotal;
      doc.text(
        `${it.description.padEnd(20)} ${it.quantity
          .toString()
          .padEnd(10)} ${it.price
          .toFixed(2)
          .padEnd(10)} ${subtotal.toFixed(2)}`,
      );
    });
    doc.moveDown();
    doc.text(`Total: €${total.toFixed(2)}`, { align: 'right' });

    doc.end();
    return stream.getContents() as Buffer;
  }
}
