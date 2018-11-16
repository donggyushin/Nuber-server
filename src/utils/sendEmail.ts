import Mailgun from "mailgun-js";


const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_PRIVATE_API_KEY || "",
  domain: process.env.SANDBOX_DOMAIN || "",
  publicApiKey: "pubkey-b2f76adac1a185be4d4c96a9b5ceee43"
});

export const sendEmail = (to:string, subject: string, text:string) => {
    const emailData = {
        from: "donggyu9410@gmail.com",
        to,
        subject,
        text
    }
    return  mailGunClient.messages().send(emailData, (error, body) => {
        console.log(body);
        console.log(error);
    })
}

export const sendVerificationEmail = (to:string, key:string, fullName:string) => {
    const subject = `Hello ${fullName}, please verify your account`;
    const content = `Your Verification key is ${key}`
    return sendEmail(to, subject, content);
}