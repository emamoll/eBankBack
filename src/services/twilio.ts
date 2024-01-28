import Config from "../config";
import nodemailer from 'nodemailer';
import twilio from "twilio";

const twilioApi = twilio(Config.TWILIO_ACCOUNT_ID, Config.TWILIO_TOKEN);

const owner = {
  name: Config.GMAIL_NAME,
  address: Config.GMAIL_EMAIL,
};

const gmailTransporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: Config.GMAIL_EMAIL,
    pass: Config.GMAIL_PASSWORD,
  },
});

export const notifyNewUserByEmail = async (userData: any) => {
  const mailOptions = {
    from: owner,
    to: Config.GMAIL_EMAIL,
    subject: 'Nuevo usuario creado',
    html: `Un nuevo usuario fue creado. Sus datos son: ${userData}`,
  };

  const response = await gmailTransporter.sendMail(mailOptions);

  return response;
};

export const notifyNewUserRegistration = async (newUser: any) => {
  const mailOption = {
    from: owner,
    to: newUser.email,
    subject: `Te damos la bienvenida ${newUser.firstName}`,
    html: `Tus datos para iniciar sesion son:
        - email: ${newUser.email},
        - alias: ${newUser.alias}`
  }
  const response = await gmailTransporter.sendMail(mailOption);

  return response;
};
