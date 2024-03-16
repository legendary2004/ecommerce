import express from "express";
import cors from "cors"
import bodyParser from "body-parser";
import ElasticEmail from "@elasticemail/elasticemail-client";
import dotenv from "dotenv"

dotenv.config({path: "./.env"})

const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.post("/clientOrder", (req, res) => {
    const {user, email} = req.body;

    let defaultClient = ElasticEmail.ApiClient.instance;
 
    let apikey = defaultClient.authentications['apikey'];
    apikey.apiKey = process.env.api_key;
    
    let api = new ElasticEmail.EmailsApi()
    
    let mail = ElasticEmail.EmailMessageData.constructFromObject({
      Recipients: [
        new ElasticEmail.EmailRecipient(email)
      ],
      Content: {
        Body: [
          ElasticEmail.BodyPart.constructFromObject({
            ContentType: "HTML",
            Content: `Hello ${user}. Thank you for your order. Your order will be delivered shortly.`
          })
        ],
        Subject: "Thank you for your purchase",
        From: process.env.user_gmail
      }
    });
    
    var callback = function(error, data, response) {
      if (error) {
        res.send({message: error})
      } else {
        res.send({message: "Thank you for your order"})
      }
    };

    api.emailsPost(mail, callback);

})

app.listen(5001, function () {
    console.log("Started application on port %d", 5001)
});