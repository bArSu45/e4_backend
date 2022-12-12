const mongoose = require("mongoose");

require(`dotenv`).config();

const connection = mongoose.connect(process.env.mongodb_url);

module.exports={connection};