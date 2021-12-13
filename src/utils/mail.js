import sgMail from "@sendgrid/mail";
import fs from "fs";
import path from "path";
sgMail.setApiKey(process.env.MY_SENDGRED_API_KEY);
const publicFolderPath = path.join(process.cwd(), "public");

export const sendMail = async (id, recepient) => {
  console.log("im here");
  console.log(recepient);
  console.log("kolluvinay425@gmail.com");
  const newFileName = `${id}.pdf`;
  const filePath = path.join(publicFolderPath, newFileName);
  console.log("filePath", filePath);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log("err", err);
    }
    if (data) {
      console.log("data", data);

      const msg = {
        to: recepient, //problem solved
        from: "lonelyvinay76@gmail.com",
        subject: "Attachment",
        html: "<strong>your appointment booking successfull!</strong>",
        attachments: [
          {
            content: data.toString("base64"),
            filename: "booking.pdf",
            type: "application/pdf",
            disposition: "attachment",
            content_id: "mytext",
          },
        ],
      };
      sgMail.send(msg);
    }
  });
};
