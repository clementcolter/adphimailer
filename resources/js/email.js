const nodemailer = require('nodemailer');

async function sendEmail(body){
    try{
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", // SMTP server host
            port: 465, // SMTP server port (587 for TLS)
            secure: true, // true for 465, false for other ports
            auth: {
              user: body.singleEmail, // Your email
              pass: body.code // Your email account password or app specific password
            }
          });
          let events = ""
          if(body.tier3Date != '' && body.tier3Time != ''){
            events += "   We are having a tier 3 " + body.tier3Date + " starting at " + body.tier3Time + ". If you are a sober bro, please be there 1-2 hours early for setup.\n";
          }

          if(body.wineWednesdayDate != '' && body.wineWednesdayTime != ''){
            events += "   We will have a 🍷Wine Wednesday🍷 this Wednesday " + body.wineWednesdayDate + " starting at " + body.wineWednesdayTime + ". Remember to send donations!\n";
          }

          if(body.formalDate != ''){
            events += "   Our semesterly formal is comming up soon, it will be the weekend of " + body.formalDate + ". Come prepared and see the additional notes below for more information\n";
          }
          // Sending email
          let info = await transporter.sendMail({
            from: body.singleEmail, // Sender address
            to: body.emailList, // List of recipients
            subject: "Weekely Event Reminder", // Subject line
            text: "Hello, this is an email sent by Alpha Delta Phi's Autmated Emailer\n\nThis weeks events:\n\n" + events + "\n Additional Information: \n\n" + body.additionalInfo + "\nIf you have any quesitons please reach out to your VP of Programming, \n\n-Xaipe", // Plain text body
          });
        
          console.log("Message sent: %s", info.messageId);
          return true;
          
    } catch (err){
        return false; 
    }
   
}

module.exports = sendEmail;