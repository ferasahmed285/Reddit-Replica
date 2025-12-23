const nodemailer = require('nodemailer');

// Create transporter lazily to ensure env vars are loaded
const createTransporter = () => {
  // Validate required env vars
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Email configuration missing: EMAIL_USER or EMAIL_PASS not set');
    console.error('EMAIL_USER exists:', !!process.env.EMAIL_USER);
    console.error('EMAIL_PASS exists:', !!process.env.EMAIL_PASS);
    return null;
  }

  console.log('Creating email transporter for:', process.env.EMAIL_USER);

  return nodemailer.createTransport({
    service: 'gmail', // Use service instead of host/port for Gmail
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // Timeout settings to prevent hanging requests
    connectionTimeout: 30000, // 30 seconds (increased for cloud)
    greetingTimeout: 30000,
    socketTimeout: 30000,
  });
};

const sendPasswordResetEmail = async (email, resetToken) => {
  console.log('Starting password reset email process for:', email);
  
  const transporter = createTransporter();
  
  if (!transporter) {
    throw new Error('Email service not configured. Please check EMAIL_USER and EMAIL_PASS environment variables.');
  }

  // Verify connection before sending
  try {
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('SMTP connection verified successfully');
  } catch (verifyError) {
    console.error('SMTP connection verification failed:', verifyError);
    console.error('Error code:', verifyError.code);
    console.error('Error command:', verifyError.command);
    throw new Error(`Email service connection failed: ${verifyError.message}`);
  }

  const clientUrl = process.env.CLIENT_URL || process.env.FRONTEND_URL;
  if (!clientUrl) {
    console.error('CLIENT_URL or FRONTEND_URL not set');
    throw new Error('Client URL not configured');
  }

  const resetUrl = `${clientUrl}/reset-password/${resetToken}`;
  console.log('Reset URL generated:', resetUrl);
  
  const mailOptions = {
    from: `"Reddit-Replica" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ff4500;">Password Reset Request</h2>
        <p>You requested to reset your password. Click the button below to set a new password:</p>
        <a href="${resetUrl}" style="display: inline-block; background-color: #ff4500; color: white; padding: 12px 24px; text-decoration: none; border-radius: 24px; margin: 16px 0;">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
        <p style="color: #888; font-size: 12px;">This email was sent from Reddit Clone</p>
      </div>
    `,
  };

  try {
    console.log('Sending email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully:', info.messageId);
    return info;
  } catch (sendError) {
    console.error('Failed to send password reset email:', sendError);
    console.error('Send error code:', sendError.code);
    throw new Error(`Failed to send email: ${sendError.message}`);
  } finally {
    transporter.close();
  }
};

module.exports = { sendPasswordResetEmail };
