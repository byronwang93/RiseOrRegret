const express = require("express");
const twilio = require("twilio");
const cors = require("cors");

const app = express();
const accountSid = "ACc5a3fb819c2cc850f47fc84abbeff7f6";
const authToken = "0852b886c0af1dfbcf75d655df6cdd72";
const client = twilio(accountSid, authToken);

app.use(cors());

app.get("/send-sms", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const recipientNumber = "+16047163698";
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

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log("this is so fun");
});
