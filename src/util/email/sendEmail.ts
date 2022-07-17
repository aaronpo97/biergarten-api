import process from 'process';
import SparkPost from 'sparkpost';
import ServerError from '../error/ServerError';

interface IEmailParams {
  emailAddress: string;
  emailBody: string;
  subject?: string;
}

/**
 * Helper function to send an email.
 *
 * Uses the SparkPost API to send automated emails from the server. Requires an email
 * address, email body, and an email subject as arguments.
 *
 * @param emailParams The parameters needed to send an email with the Sparkpost API.
 * @param emailParams.emailAddress The email address the server will send an email to.
 * @param emailParams.emailBody The body of the email to be sent.
 * @param emailParams.subject The subject of the email to be sent. Defaults to "No Subject".
 * @throws ServerError with status 500 if the Sparkpost API key is not provided in the
 *   environment variables.
 */
const sendEmail = async (emailParams: IEmailParams) => {
  const { emailAddress, emailBody, subject = 'No Subject' } = emailParams;

  const emailKey = process.env.SPARKPOST_API_KEY;
  if (!emailKey) {
    throw new ServerError('Could not send email due to a problem on our end.', 500);
  }

  const client = new SparkPost(emailKey);
  await client.transmissions.send({
    content: {
      subject,
      from: 'contact@aaronwilliampo.com',
      html: emailBody,
    },
    recipients: [{ address: emailAddress }],
  });
};

export default sendEmail;
