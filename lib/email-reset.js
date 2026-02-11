import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lav.vimean168@gmail.com",
    pass: "uvlr qlvy yvaz jiuj",
  },
});

export async function sendResetPasswordEmail(email, name, resetLink) {
  const mailOptions = {
    from: '"Campus Lost & Found" <lav.vimean168@gmail.com>',
    to: email,
    subject: "Reset Your Password - Campus Lost & Found",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
          .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
          .content { background-color: white; padding: 30px; border-radius: 0 0 5px 5px; }
          .button { display: inline-block; padding: 12px 24px; background: #4F46E5; color: #fff; border-radius: 5px; text-decoration: none; font-weight: bold; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Campus Lost & Found</h1>
          </div>
          <div class="content">
            <h2>Hello, ${name}!</h2>
            <p>We received a request to reset your password. Click the button below to set a new password. This link will expire in 15 minutes.</p>
            <a href="${resetLink}" class="button">Reset Password</a>
            <p>If you did not request a password reset, you can safely ignore this email.</p>
          </div>
          <div class="footer">
            <p>&copy; 2026 Campus Lost & Found. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Reset password email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending reset email:", error);
    throw error;
  }
}
