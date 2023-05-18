const { Schema, default: mongoose } = require("mongoose");

const catalog = new Schema({}, { strict: false });

module.exports = mongoose.model("Catalog", catalog);
