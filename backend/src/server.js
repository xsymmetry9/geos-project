// server.js
const app = require("./app");

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`CORS-enabled web server listening on port ${port}`);
});