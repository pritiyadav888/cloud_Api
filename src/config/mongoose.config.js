const mongoose = require("mongoose");

const dbConnect = () => {
    if (mongoose.connection.readyState >= 1) {
      return;
    }
  
    mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("---Connected---");
  };
  
module.exports = {dbConnect}