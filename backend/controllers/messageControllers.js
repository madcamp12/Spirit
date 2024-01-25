const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");

// Send New Message
exports.newMessage = async (req, res) => {

    const { chatId, content } = req.body;

    const msgData = {
        sender: req.user._id,
        chatId,
        content,
    }

    const newMessage = await Message.create(msgData);

    Chat.findByIdAndUpdate(chatId, { latestMessage: newMessage })
        .then(chat => {
            return res.status(200).json({
                success: true,
                newMessage: newMessage
            });
        })
        .catch(error => {
            console.log('in newMessage: cannot find chat');
            console.log(error);

            return res.status(500).json({
                success: false
            })
        })
};

// Get All Messages
exports.getMessages = async (req, res) => {

    Message.find( { chatId: req.params.chatId })
        .then(message => {
            return res.status(200).json({
                success: true,
                messages: message 
            });
        })
        .catch(error => {
            console.log('in getMessages: cannot find messages');
            console.log(error);

            return res.status(500).json({
                success: false,
            })
        })
};