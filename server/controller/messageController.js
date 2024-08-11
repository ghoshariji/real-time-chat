const { getReceiverId, io, emitMessage } = require("../socket/socket");
const messageModel = require("../models/messageModel");
const conversationModel = require("../models/conversionModel");
const userModel = require("../models/userModel");

const save = async (req, res) => {
  try {
    console.log(req.body);

    const { senderId, receiverId, newMessage } = req.body;
    let conversation = await conversationModel.findOne({
      particapant: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await conversationModel.create({
        particapant: [senderId, receiverId],
      });
    }

    const message = await messageModel.create({
      senderId,
      receiverId,
      newMessage,
    });
    if (message) {
      conversation.chat.push(message._id);
    }
    await conversation.save();
    const socketId = getReceiverId(receiverId);
    if (socketId) {
      emitMessage(socketId, message);
    }

    return res.status(201).send({
      message: "Message saved",
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(409).send({
      message: error.message,
      success: false,
    });
  }
};

const getMessage = async (req, res) => {
  try {
    console.log(req.body);
    const { senderId, receiverId } = req.body;
    const data = await conversationModel
      .findOne({
        particapant: { $all: [senderId, receiverId] },
      })
      .populate("chat");
    console.log(data);
    return res.status(201).send({
      message: "Data fetch",
      success: true,
      data: data,
    });
  } catch (error) {
    return res.status(201).send({
      message: error.message,
      success: false,
    });
  }
};

const getChatList = async (req, res) => {
  try {
    // const data = await messageModel.find({
    //   $or: [{ senderId: userId }, { receiverId: userId }],
    // });
    const data = await userModel.find()
    return res.status(201).send({
      message: "Data fetch",
      success: true,
      data: data,
    });
  } catch (error) {
    return res.status(201).send({
      message: error.message,
      success: false,
    });
  }
};

module.exports = { save, getMessage, getChatList };
