require("dotenv").config();
const express = require("express");
const twilio = require("twilio");
const cors = require("cors");

const app = express();
const accountSid = process.env.TWILIO_SID_KEY;
const authToken = process.env.TWILIO_TOKEN_KEY;
const client = twilio(accountSid, authToken);

app.use(cors());

app.get("/send-sms", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const recipientNumber = "+16047205368";
  console.log("WE'RE IN");
  // const recipientNumber = req.query.to; // Get the recipient's phone number from the request query parameters
  const messageContent = "You suck you fool!"; // The content of the message you want to send

  client.messages
    .create({
      body: messageContent,
      from: "+12545363427",
      to: recipientNumber,
    })
    .then((message) => {
      console.log("Message sent. SID:", message.sid);
      res.send("Message sent successfully!");
    })
    .catch((error) => {
      console.error("Error sending message:", error);
      res.status(500).send("Error sending message");
    });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
  console.log("this is so fun");
});
