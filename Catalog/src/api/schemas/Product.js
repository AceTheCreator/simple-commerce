const { Schema, default: mongoose } = require("mongoose");

const catalog = new Schema({
  owner: {
    type: String,
    require,
  },
  name: {
    type: String,
    require,
  },
  image: {
    type: String,
    require,
  },
  type: {
    type: String,
    require,
  },
  price: {
    type: Number,
    require,
  },
  description: {
    type: String,
    require,
  },
});

module.exports = mongoose.model("Catalog", catalog);
