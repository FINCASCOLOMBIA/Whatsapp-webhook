const express = require("express");
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;
const verifyToken = process.env.VERIFY_TOKEN;

// Verificación del webhook (Meta)
app.get("/", (req, res) => {
  const mode = req.query["hub.mode"];
  const challenge = req.query["hub.challenge"];
  const token = req.query["hub.verify_token"];

  if (mode === "subscribe" && token === verifyToken) {
    console.log("WEBHOOK VERIFIED");
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403);
  }
});

// Recibir mensajes
app.post("/", (req, res) => {
  console.log("Webhook recibido:");
  console.log(JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// Levantar servidor
app.listen(port, () => {
  console.log("Servidor corriendo en puerto " + port);
})
