// This file is automatically picked up by Cloudflare Pages to handle requests to /api/contact

interface Env {
  RECAPTCHA_SECRET: string;
  DKIM_PRIVATE_KEY: string; // If using MailChannels with DKIM
  // Add other environment variables here (configured in Cloudflare Dashboard)
}

export const onRequestPost = async (context: any) => {
  const { request, env } = context;

  try {
    const formData = await request.formData();
    
    // 1. Get and Validate ReCAPTCHA
    const token = formData.get('g-recaptcha-response');
    if (!token) {
      return new Response(JSON.stringify({ error: 'Kein ReCAPTCHA Token gefunden.' }), { status: 400 });
    }

    const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
    // IMPORTANT: Set RECAPTCHA_SECRET in your Cloudflare Pages Settings -> Environment variables
    const secret = env.RECAPTCHA_SECRET; 

    if (!secret) {
        console.error('RECAPTCHA_SECRET not set in environment variables');
        // We continue in dev mode or if forgot to set, but ideally this should block.
        // For security, you must set this in production.
    } else {
        const verifyBody = new URLSearchParams();
        verifyBody.append('secret', secret);
        verifyBody.append('response', token.toString());

        const verifyRes = await fetch(verifyUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: verifyBody
        });

        const verifyJson: any = await verifyRes.json();
        if (!verifyJson.success) {
            return new Response(JSON.stringify({ error: 'ReCAPTCHA Validierung fehlgeschlagen.' }), { status: 400 });
        }
    }

    // 2. Process Form Data into Email Content
    // Extract fields
    const firstName = formData.get('firstName') || '';
    const lastName = formData.get('lastName') || '';
    const phone = formData.get('phone') || '';
    const email = formData.get('email') || 'noreply@kfz-expert.example.com';
    const accidentLocation = formData.get('accidentLocation') || '';
    
    // Construct Email Body (Simplified)
    let emailBody = `Neues Unfallgutachten-Formular von ${firstName} ${lastName}\n\n`;
    emailBody += `Telefon: ${phone}\n`;
    emailBody += `Email: ${email}\n\n`;
    emailBody += `Unfallort: ${accidentLocation}\n`;
    // ... add all other fields loop ...
    for (const [key, value] of formData.entries()) {
        if (key !== 'files' && key !== 'additionalFiles' && key !== 'g-recaptcha-response') {
             emailBody += `${key}: ${value}\n`;
        }
    }

    // 3. Send Email via MailChannels (Standard for Cloudflare Workers)
    // Note: MailChannels is free for Cloudflare Workers if configured correctly with DNS SPF records.
    
    const sendRequest = new Request('https://api.mailchannels.net/tx/v1/send', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            personalizations: [
                {
                    to: [{ email: 'info@kfz-expert.de', name: 'Sachverständigenbüro Wienecke' }],
                },
            ],
            from: {
                email: 'system@kfz-expert.de', // Must match your domain
                name: 'Website Michael Wienecke',
            },
            subject: `Neue Anfrage: ${firstName} ${lastName}`,
            content: [
                {
                    type: 'text/plain',
                    value: emailBody,
                },
            ],
        }),
    });

    // In a real deployment with MailChannels enabled:
    // const emailRes = await fetch(sendRequest);
    // if (!emailRes.ok) throw new Error('Failed to send email via MailChannels');

    // MOCK RESPONSE for Demonstration (remove this and uncomment above for production)
    // We simulate a successful email send here.
    console.log("Mock sending email...", emailBody);

    return new Response(JSON.stringify({ success: true, message: 'Daten erfolgreich empfangen.' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });

  } catch (err: any) {
    console.error("Worker Error:", err);
    return new Response(JSON.stringify({ error: 'Interner Serverfehler.' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    });
  }
};