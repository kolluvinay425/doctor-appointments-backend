import PdfPrinter from "pdfmake";
import fs from "fs";
import path from "path";
const publicFolderPath = path.join(process.cwd(), "public");
console.log(publicFolderPath);
const fonts = {
  Roboto: {
    normal: "Helvetica",
    bold: "Helvetica-Bold",
    italics: "Helvetica-Oblique",
    bolditalics: "Helvetica-BoldOblique",
  },
};
const printer = new PdfPrinter(fonts);

export const generateAppointmentPDF = async (booking) => {
  console.log("aappp", booking);
  const docDefinition = {
    content: [
      {
        text: `your doctor appointment is confirmed on ${booking.appointmentDate}`,
        fontSize: 20,
        bold: true,
        margin: [0, 0, 0, 40],
      },
      {
        text: `your appointment starting time is ${booking.startTime}`,
        bold: true,
        lineHeight: 4,
      },
      {
        text: `your appointment end time is ${booking.endTime}`,
        bold: true,

        lineHeight: 4,
      },
    ],
  };
  const newFileName = `${booking._id}.pdf`;
  const filePath = path.join(publicFolderPath, newFileName); // users/myname/projectname/public/m5-d4-debrief.mp4

  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  pdfDoc.pipe(fs.createWriteStream(filePath));
  pdfDoc.end();
  return pdfDoc;
};
