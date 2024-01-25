const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectMongoDB = require('./config/database');
const path = require('path');
const fs = require('fs');

// import routes
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const chatRouter = require('./routes/chat');
const messageRouter = require('./routes/message');

// setting environment variables
if (process.env.NODE_ENV != "develop") {
    require('dotenv').config({ path: '/app/config/config.env' });
}

const app = express();
connectMongoDB();
  

// app setting: CORS, public folder, json
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


// setting routers
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/chats', chatRouter);
app.use('/messages', messageRouter);


// setting for get or delete images
app.get('/images/:img', (req, res) => {
    const img = req.params.img
    return res.sendFile(process.cwd() + `/images/${img}`);
})


module.exports = app;