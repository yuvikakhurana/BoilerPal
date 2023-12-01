import nodemailer from "nodemailer";

// TODO: For added security, allow for passing in of user and pass
const sendEmail = async (email, subject, text) => {
    try {
        
        // Email transporter info
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 465,
            secure: true,
            logger: true,
            debug: true,
            secureConnection: false,
            auth: {
                user: 'boilerpal.team@gmail.com',
                pass: 'rqanormgqvrpfunq'
            }
        });

        // Sends mail
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text
        });
        console.log('Sent email');
    } catch (error) {
        console.log('Email not sent');
        console.log(error);
    }
}

export default sendEmail;