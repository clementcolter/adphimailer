const nodemailer = require('nodemailer');

async function sendEmail(emailer, emails, app_code){
    try{
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", // SMTP server host
            port: 465, // SMTP server port (587 for TLS)
            secure: true, // true for 465, false for other ports
            auth: {
              user: emailer, // Your email
              pass: app_code // Your email account password or app specific password
            }
          });
        
          // Sending email
          let info = await transporter.sendMail({
            from: '"Your Name" <your_email@example.com>', // Sender address
            to: emails, // List of recipients
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // Plain text body
            html: "<b>Hello world?</b>" // HTML body content
          });
        
          console.log("Message sent: %s", info.messageId);
          return true;
          
    } catch (err){
        return false; 
    }
   
}

module.exports = sendEmail;