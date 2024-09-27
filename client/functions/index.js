const functions = require("firebase-functions");
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aliakbaresmaeili98@gmail.com",
    pass: "cgop ttip zuqz hqlr",
  },
});

exports.sendEmail = functions.https.onCall((data, context) =>{
  const {name, email, date, time, message} = data;

  const mailOptions = {
    from: "aliakbaresmaeili98@gmail.com",
    to: "aliakbaresmaeili98@gmail.com",
    subject: "New Appointment Booking",
    html: `<h3>New Appointment Booking</h3>
           <p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Date:</strong> ${date}</p>
           <p><strong>Time:</strong> ${time}</p>
           <p><strong>Message:</strong>
            ${message || "No message provided"}</p>`,
  };


  return transporter.sendMail(mailOptions)
      .then(() => {
        return {success: true, message: "Email sent successfully!"};
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        throw new functions.https
            .HttpsError("internal", "Unable to send email");
      });
});
