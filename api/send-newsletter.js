// Vercel Serverless Function for Newsletter Subscription
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Send notification to admin
    const adminNotification = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Anantaraa Website <noreply@anantaraa.in>',
        to: 'hello@anantaraa.in',
        subject: 'New Newsletter Subscription',
        html: `
          <h2>New Newsletter Subscription</h2>
          <p><strong>Email:</strong> ${email}</p>
          <hr>
          <p style="color: #666; font-size: 12px;">Sent from Anantaraa Design Studio website</p>
        `
      })
    });

    // Send thank you email to subscriber
    const subscriberEmail = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Anantaraa Design Studio <hello@anantaraa.in>',
        to: email,
        subject: 'Welcome to Anantaraa Design Studio',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: 'Georgia', serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
                .header { text-align: center; margin-bottom: 40px; }
                .logo { font-size: 24px; font-weight: 600; letter-spacing: 0.1em; color: #1A1A1A; }
                .subtitle { font-size: 12px; letter-spacing: 0.2em; color: #666; text-transform: uppercase; margin-top: 5px; }
                .content { background: #F5F5F0; padding: 40px; border-radius: 4px; margin-bottom: 30px; }
                h1 { font-size: 28px; font-weight: 400; margin-bottom: 20px; color: #1A1A1A; }
                p { margin-bottom: 15px; color: #666; }
                .footer { text-align: center; font-size: 12px; color: #999; margin-top: 40px; }
                .divider { border-top: 1px solid #E0E0E0; margin: 30px 0; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <div class="logo">ANANTARAA</div>
                  <div class="subtitle">Design Studio</div>
                </div>

                <div class="content">
                  <h1>Thank You for Subscribing!</h1>
                  <p>We're delighted to have you join the Anantaraa community.</p>
                  <p>You'll now receive our latest updates on architectural projects, design insights, and thought-provoking ideas about space and living.</p>
                  <p>We believe that architecture is not just about shelter, but about the poetry of living. We're excited to share our vision with you.</p>
                </div>

                <div class="divider"></div>

                <div class="footer">
                  <p>Anantaraa Design Studio<br>
                  341, Avadh Arena, VIP Road, Vesu, Surat 395007</p>
                  <p>© ${new Date().getFullYear()} Anantaraa Design Studio. All rights reserved.</p>
                </div>
              </div>
            </body>
          </html>
        `
      })
    });

    const adminData = await adminNotification.json();
    const subscriberData = await subscriberEmail.json();

    if (!adminNotification.ok || !subscriberEmail.ok) {
      throw new Error('Failed to send one or more emails');
    }

    return res.status(200).json({
      success: true,
      message: 'Newsletter subscription successful',
      adminEmailId: adminData.id,
      subscriberEmailId: subscriberData.id
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
}
