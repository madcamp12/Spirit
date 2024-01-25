const Chat = require("../models/chatModel");

// Create New Chat
exports.newChat = async (req, res) => {

    const chatExists = await Chat.findOne({ users: { $all: [req.user._id, req.body.receiverId] }});

    if (chatExists) {
        return res.status(200).json({
            success: true,
            chat: chatExists
        });
    }

    Chat.create({
        users: [req.user._id, req.body.receiverId],
    })
        .then(chat => {
            return res.status(200).json({
                success: true,
                chat: chat
            })
        })
        .catch(error => {
            console.log('in newChat: cannot make chat');
            console.log(error);

            return res.status(200).json({
                success: false,
            })
        })
};

// Get All Chats
exports.getChats = async (req, res) => {

    Chat.find( { users: { $in: [req.user._id] } } )
        .sort({ updatedAt: -1 }).populate("users latestMessage")
        .then(chats => {
            return res.status(200).json({
                success: true,
                chats: chats
            });
        })
        .catch(error => {
            console.log('in getChats: can not find chats');
            console.log(error);

            return res.status(500).json({
                success: false
            });
        })
};