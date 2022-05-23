import process from 'process';
import SparkPost from 'sparkpost';
import ServerError from '../error/ServerError';

interface IEmailParams {
  emailAddress: string;
  emailBody: string;
  subject: string;
}

/**
 * Helper function to send an email.
 *
 * Uses the SparkPost API to send automated emails from the server. Requires an email
 * address, email body, and an email subject as arguments.
 *
 * If an error is thrown anywhere in the function, the function will return a rejected
 * promise that must be handled wherever the function is invoked.
 */
const sendEmail = async ({
  emailAddress,
  emailBody,
  subject = 'No Subject',
}: IEmailParams) => {
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
