const bodyParser = require(`body-parse`);
const cors = require(`cors`);
const express = require(`express`);
const path = require(`path`);

if (process.env.NODE_ENV !== `production`) require(`dotenv`).config();
const stripe = require(`stripe`)(process.env.STRIPE_SERCRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === `production`) {
  app.use(express.static(path.join(__dirname, `client/build`)));
  app.get(`*`, (req, res) => {
    res.sendFile(path.join(__dirname, `client/build`, `index.html`));
  })
} 

app.listen(port, (error) => {
  if (error) throw error;
  console.log(`Server listening on: ${port}`)
})

app.post(`/payment`, (req, res) => {
  const body = {
    amount: req.body.amount,
    currency: `usd`,
    source: req.body.token.id,
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) res.status(500).send({ error: stripeErr });
    res.status(200).send({ success: stripeRes });
  })
})