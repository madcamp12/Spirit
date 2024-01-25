const app = require('./app');
const port = process.env.PORT || 80;

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

////////// socket.io //////////

let users = [];

const io = require("socket.io")(server, {
    // pingTimeout: 60000,
    cors: {
        origin: "*",
    }
});

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
}

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
}

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
}

io.on("connection", (socket) => {
    console.log("🚀 Someone connected!");

    socket.on("addUser", (userId) => { // userId는 고유한 이름: _id 등 .. 으로 받아야 할 듯
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    socket.on("sendMessage", ({ senderId, receiverId, content }) => {

        const user = getUser(receiverId);

        io.to(user?.socketId).emit("getMessage", { // client 측에서 getMessage 설정
            senderId,
            content,
        });
    });

    // typing states
    socket.on("typing", ({ senderId, receiverId }) => {
        const user = getUser(receiverId);
        io.to(user?.socketId).emit("typing", senderId);
    });

    socket.on("typing stop", ({ senderId, receiverId }) => {
        const user = getUser(receiverId);
        io.to(user?.socketId).emit("typing stop", senderId);
    });

    // user disconnected
    socket.on("disconnect", () => {
        console.log("⚠️ Someone disconnected")
        removeUser(socket.id);
        io.emit("getUsers", users);
        // console.log(users);
    });
});