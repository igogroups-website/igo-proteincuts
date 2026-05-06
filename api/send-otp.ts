import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, otp, userName } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'IGO Protein Cuts <onboarding@resend.dev>',
      to: [email],
      subject: 'Your IGO Verification Code',
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #2D5A27;">Welcome to IGO Protein Cuts, ${userName}!</h2>
          <p>Your secure verification code is:</p>
          <div style="font-size: 32px; font-weight: bold; color: #D4AF37; letter-spacing: 5px; margin: 20px 0;">
            ${otp}
          </div>
          <p style="color: #666; font-size: 12px;">This code expires in 10 minutes. If you didn't request this, please ignore this email.</p>
        </div>
      `,
    });

    res.status(200).json(data);
  } catch (error) {
    console.error('Resend Error:', error);
    res.status(400).json(error);
  }
}
