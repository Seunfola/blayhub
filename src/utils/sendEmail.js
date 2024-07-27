import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async ({ to, subject, text, html, replyTo }) => {
    const msg = {
        to,
        from: 'support@blayhub.com', // Ensure this email is verified in SendGrid
        subject,
        text,
        html,
        reply_to: replyTo, // Correctly set the reply-to field
        headers: {
            'List-Unsubscribe': '<mailto:unsubscribe@blayhub.com>',
        },
    };

    try {
        await sgMail.send(msg);
    } catch (error) {
        console.error('Error sending email:', error);
        if (error.response) {
            console.error('SendGrid error details:', error.response.body);
            throw new Error(error.response.body.errors[0].message || 'Failed to send email');
        }
        throw new Error('Failed to send email');
    }
};
