import nodemailer from 'nodemailer';

/**
 * Creates a transporter instance. 
 * Initializing inside a function ensures environment variables are loaded before use.
 */
const getTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use SSL/TLS
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, otp, userName } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Missing email or otp' });
  }

  try {
    const transporter = getTransporter();
    console.log(`Attempting to send OTP to ${email}...`);
    
    const info = await transporter.sendMail({
      from: `"IGO Protein Cuts" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Your IGO Verification Code',
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #2D5A27;">Welcome to IGO Protein Cuts, ${userName || 'Valued Customer'}!</h2>
          <p>Your secure verification code is:</p>
          <div style="font-size: 32px; font-weight: bold; color: #D4AF37; letter-spacing: 5px; margin: 20px 0;">
            ${otp}
          </div>
          <p style="color: #666; font-size: 12px;">This code expires in 10 minutes. If you didn't request this, please ignore this email.</p>
        </div>
      `,
    });

    console.log('Nodemailer Success:', info.messageId);
    res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error: any) {
    console.error('Nodemailer Error:', error);
    res.status(500).json({ 
      error: 'Failed to send email', 
      details: error.message || error 
    });
  }
}

