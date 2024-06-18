const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema({
  particapant: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  chat: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
    },
  ],
});

const conversationModel = mongoose.model("conversation", conversationSchema);
module.exports = conversationModel;
