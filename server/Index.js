// server/index.js
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  // Configure your email service here
});

app.post('/api/support', (req, res) => {
  const { message } = req.body;

  const mailOptions = {
    from: 'your-app-email@example.com',
    to: 'laxfocusnonprofit@gmail.com',
    subject: 'New Support Question',
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));