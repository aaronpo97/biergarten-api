import User from '../../database/model/User';
import sendEmail from '../email/sendEmail';

/**
 * Helper function to send a confirmation email.
 *
 * @param confirmationToken A newly generated confirmation token.
 * @param registeredUser An instance of User that you wish to send the confirmation email to.
 */
const sendConfirmationEmail = async (
  confirmationToken: string,
  registeredUser: User,
): Promise<void> => {
  const { email: emailAddress, username } = registeredUser;

  const emailBody = `
          <body>
               <main>
                    <div style="margin-bottom: 2em;">
                         <h1 style="margin-bottom: 1em;">
                              Welcome, ${username}!
                         </h1>
                         <p>
                              Please confirm your account with this token.
                         </p>
                         <div>
                              <code>${confirmationToken}</code>
                         </div>
                    </div>
                    <div>
                         <em>
                              This email was automatically generated.
                              Any replies to this email address will not be received.
                         </em>
                    </div>
               </main>
          </body>
     `;

  await sendEmail({ emailAddress, emailBody, subject: 'Welcome!' });
};

export default sendConfirmationEmail;
