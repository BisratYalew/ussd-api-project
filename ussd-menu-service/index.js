const express = require("express");
const router = require("./routes");
const session = require("./middleware/session");

const app = express();
app.use(express.json());
// if you run behind a proxy (e.g. nginx)
// app.set('trust proxy', 1);


app.use(session);
app.use(router);
app.listen(process.env.USSD_PORT || 3001, () => console.log(`server is running on port ${process.env.PORT || 3001}`));


module.exports = app;