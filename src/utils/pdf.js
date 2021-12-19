import PdfPrinter from "pdfmake";
import fs from "fs";
import { join } from "path";
import { promisify } from "util";
import { pipeline } from "stream";

const publicFolderPath = join(process.cwd(), "public");
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

export const generateAppointmentPDF = async (
  booking,
  doctor,
  user,
  hospital
) => {
  const asyncPipeline = promisify(pipeline);
  console.log("hospital", hospital[0].location);
  const docDefinition = {
    content: [
      {
        alignment: "center",
        text: "STRIVE DOCTOR APPOINTMENT CONFORMATION",
        style: "header",
        fontSize: 17,
        bold: true,
        margin: [0, 10],
      },
      {
        margin: [0, 0, 0, 10],
        layout: {
          fillColor: function (rowIndex, node, columnIndex) {
            return rowIndex % 2 === 0 ? "#ebebeb" : "#f5f5f5";
          },
        },
        table: {
          widths: ["100%"],
          heights: [20, 10],
          body: [
            [
              {
                text: `Date: ${"21/12/2021"}`,
                fontSize: 9,
                bold: true,
              },
            ],
            [
              {
                text: `User Name: ${user.firstName} ${user.lastName}`,
                fontSize: 9,
                bold: true,
              },
            ],
          ],
        },
      },
      {
        style: "tableExample",
        layout: {
          fillColor: function (rowIndex, node, columnIndex) {
            return rowIndex === 0 ? "#c2dec2" : null;
          },
        },
        table: {
          widths: ["30%", "10%", "25%", "35%"],
          heights: [10, 10, 10, 10, 30, 10, 25],
          headerRows: 1,
          body: [
            [
              {
                text: `Appointment Date`,
                fontSize: 9,
                bold: true,
              },
              {
                text: `${booking.appointmentDate}`,
                colSpan: 3,
                fontSize: 9,
                bold: true,
              },
              {},
              {},
            ],
            [
              {
                text: `Hospital Name`,
                fontSize: 9,
                bold: true,
              },
              {
                text: `${doctor.hospital}`,
                colSpan: 3,
                fontSize: 9,
                bold: true,
              },
              {},
              {},
            ],
            [
              {
                text: `Hospital Location`,
                fontSize: 9,
                bold: true,
              },
              {
                text: `${hospital[0].location}`,
                colSpan: 3,
                fontSize: 9,
                bold: true,
              },
              {},
              {},
            ],
            [
              {
                text: `Doctor Name`,
                fontSize: 9,
                bold: true,
              },
              {
                text: `${doctor.firstName} ${doctor.lastName} `,
                colSpan: 3,
                fontSize: 9,
                bold: true,
              },
              {},
              {},
            ],
            [
              {
                text: ["Booking Time "],
                fontSize: 9,
                bold: true,
              },
              {
                text: [`${booking.startTime} - ${booking.endTime}`],
                colSpan: 3,
                fontSize: 9,
                bold: true,
              },
              {},
              {},
            ],

            [
              {
                text: `Hospital Emergency No: +39 56981234`,
                border: [true, true, false, false],
                colSpan: 2,
                fontSize: 9,
                bold: true,
              },
              {},
              {
                text: `Hospital Email: ${hospital[0].name}@${doctor.firstName}${doctor.lastName}`,
                border: [false, true, true, false],
                colSpan: 2,
                fontSize: 9,
                bold: true,
              },
              {},
            ],
            [
              {
                text: "Looking forward to see you.",
                border: [true, false, true, true],
                colSpan: 4,
                fontSize: 9,
                bold: true,
              },
              {},
              {},
              {},
            ],
            [
              {
                text: "developed by Vinay Monster",
                border: [true, false, true, true],
                colSpan: 4,
                fontSize: 10,
                bold: true,
              },
              {},
              {},
              {},
            ],
          ],
        },
      },
    ],
  };
  const newFileName = `${booking._id}.pdf`;
  const filePath = join(publicFolderPath, newFileName);

  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  pdfDoc.end();
  await asyncPipeline(pdfDoc, fs.createWriteStream(filePath));
};
// const pdfDoc = printer.createPdfKitDocument(docDefinition);
//   pdfDoc.pipe(fs.createWriteStream(filePath));
//   pdfDoc.end();
//   return pdfDoc;
