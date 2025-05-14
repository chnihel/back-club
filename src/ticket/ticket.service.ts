import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket } from './entities/ticket.entity';
import PDFDocument = require('pdfkit');
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class TicketService {
  constructor(@InjectModel("ticket") private ticketModel:Model<Ticket>){}
  
 async generateTicketPDF(ticket: Ticket): Promise<string> {
  const ticketsDir = path.join(process.cwd(), 'tickets');

  if (!fs.existsSync(ticketsDir)) {
    fs.mkdirSync(ticketsDir);
  }

  const filePath = path.join(ticketsDir, `ticket-${ticket._id}.pdf`);
  const doc = new PDFDocument();
  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);

  doc.fontSize(25).text('Ticket de Paiement', { align: 'center' });
  doc.moveDown();
  doc.fontSize(16).text(`Nom Membre : ${ticket.nomMembre}`);

  if (ticket.nomClub) {
    doc.text(`Club       : ${ticket.nomClub}`);
  } else if (ticket.nomEvent) {
    doc.text(`Événement  : ${ticket.nomEvent}`);
  }

  doc.text(`Montant    : ${ticket.montant} USD`);
  doc.text(`Date       : ${ticket.datePaiement?.toLocaleDateString?.() || new Date().toLocaleDateString()}`);
  doc.text(`Statut     : ${ticket.statut || 'Validé'}`);
  doc.end();

  await new Promise<void>((resolve) => {
    writeStream.on('finish', () => resolve());
  });

  return filePath;
}

}
