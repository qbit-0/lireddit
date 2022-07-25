import nodemailer from "nodemailer";

const sendEmail = async (to: string, html: string) => {
  // const testAccount = await nodemailer.createTestAccount();
  // console.log("testAccount", testAccount);

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "lasn2sbwoidki75j@ethereal.email",
      pass: "JwSqXVHVkKZwYy8PkR",
    },
  });

  const info = await transporter.sendMail({
    from: '"Fred Foo" <foo@example.com>',
    to: to,
    subject: "Change password",
    html: html,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
export default sendEmail;
