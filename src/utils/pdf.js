import PdfPrinter from "pdfmake";
import path, { dirname, extname } from "path";
import fs from "fs";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const publicDirectory = path.join(__dirname, "../../booking.pdf");
console.log(publicDirectory);
const fonts = {
  Roboto: {
    normal: "Helvetica",
    bold: "Helvetica-Bold",
    italics: "Helvetica-Oblique",
    bolditalics: "Helvetica-BoldOblique",
  },
};
const printer = new PdfPrinter(fonts);

export const generateAppointmentPDF = async (appointment) => {
  console.log("aappp", appointment);
  const docDefinition = {
    content: [
      {
        text: `your doctor appointment is conformed on ${appointment.date}`,
        fontSize: 20,
        bold: true,
        margin: [0, 0, 0, 40],
      },
      {
        text: `your appointment starting time is ${appointment.startTime}`,
        bold: true,
        lineHeight: 4,
      },
      {
        text: `your appointment end time is ${appointment.endTime}`,
        bold: true,

        lineHeight: 4,
      },
    ],
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  //   console.log(pdfDoc);
  pdfDoc.pipe(fs.createWriteStream("booking.pdf"));
  pdfDoc.end();
  //console.log(pdfDoc);

  fs.readFile("booking.pdf", (err, data) => {
    if (err) {
      console.log("err", err);
    }
    if (data) {
      console.log("msg", data);
      const msg = {
        to: "recipient@test.org",
        from: "sender@test.org",
        subject: "Attachment",
        html: "<p>Here’s an attachment for you!</p>",
        attachments: [
          {
            content: data.toString("base64"),
            filename: "some-attachment.pdf",
            type: "application/pdf",
            disposition: "attachment",
            content_id: "mytext",
          },
        ],
      };
    }
  });
};
