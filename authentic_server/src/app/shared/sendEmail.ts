import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.nodeEnv==="development"?false:true,
    auth: {
      user: config.companyEmail,
      pass: config.companyPass,
    },
  });

  const info = await transporter.sendMail({
    from:config.companyEmail,
    to,
    subject, 
    html,
  });

  console.log('Email sent:', info.messageId);
};
