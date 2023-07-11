const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51NMZ5rBEKuEbMVJ0YA4r42Ngxvk0aQoPIrhURKoWJ7pkEviGLudQ7y2fgc0oiN2YJfsp97CGAtSkzsvucfDUTz6e00DfQMSijE"
);

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res, next) => {
  res.status(200).send("hello world");
});

app.post("/payment/create", async (request, response) => {
  const total = request.query.total;


  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

exports.api = functions.https.onRequest(app);

// http://127.0.0.1:5001/website-bf006/us-central1/api
