const router = require("express").Router()
const messageController = require("../controller/messageController")

router.post("/save-message",messageController.save)
router.post("/get-message",messageController.getMessage)
router.post("/get-chat-list",messageController.getChatList)


module.exports = router