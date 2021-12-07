import sgMail from "@sendgrid/mail";
import fs from "fs";
sgMail.setApiKey(process.env.MY_SENDGRED_API_KEY);

const pdff = () => {};

export const sendMail = async () => {
  fs.readFile("kolluCv.pdf", (err, data) => {
    if (err) {
      console.log("err", err);
    }
    if (data) {
      const msg = {
        to: "kolluvinay425@gmail.com",
        from: "lonelyvinay76@gmail.com",
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
      sgMail.send(msg);
    }
  });
  //   const data = pdff();
  //   console.log("data", data);

  //console.log("msg", msg);
};
