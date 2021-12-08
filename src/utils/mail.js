import sgMail from "@sendgrid/mail";
import fs from "fs";
sgMail.setApiKey(process.env.MY_SENDGRED_API_KEY);

export const sendMail = async (id, recepient) => {
  console.log("im here");
  console.log(recepient);
  console.log("kolluvinay425@gmail.com");

  fs.readFile(`${id}.pdf`, (err, data) => {
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
