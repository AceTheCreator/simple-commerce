const { Schema, default: mongoose } = require("mongoose");

const order = new Schema(
  {
    name: {
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
    email: {
      type: String,
      require,
    },
    vendorEmail: {
      type: String,
      require,
    },
    address: {
        type: String,
        require
    },
    customerName: {
        type: String,
        require
    },
    currency: {
        type: String,
        require
    }
  },
);

module.exports = mongoose.model("Order", order);
