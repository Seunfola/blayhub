import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async ({ to, subject, text, html }) => {
    const msg = {
        to,
        from: 'support@blayhub.com',
        subject,
        text,
        html,
        headers: {
            'Reply-To': 'support@blayhub.com',
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
