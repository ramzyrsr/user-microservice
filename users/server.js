const app = require("./src/app");

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch(err => {
      console.log('Cannot connect to the database!', err);
      process.exit();
  });

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("server running on port:", PORT);
});