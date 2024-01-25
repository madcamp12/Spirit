const mongoose = require('mongoose');

// post는 하나의 전시회를 의미합니다
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    post_descript: { // post 설명
        type: String,
        trim: true
    },
    title_image: { // 대표이미지
        type: String,
        trim: true,
        required: true
    },
    title_image_small: {
        type: String,
        trim: true,
    },
    images_origin: [{ // 원본 이미지들
        type: String,
        trim: true,
    }],
    images_small: [{ // 4:3 비율로 자른 이미지들
        type: String,
        trim: true,
    }],
    scripts: [{ // 각 사진에 대한 설명들
        type: String,
        trim: true
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        comment: {
            type: String,
            required: true,
            trim: true
        }
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    savedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

postSchema.pre('remove', async function (next) {
    try{
        await mongoose.model(User).updateMany(
            {posts: this._id},
            {$pull: {posts: this._id}}
        );

        await mongoose.model(User).updateMany(
            {saved: this._id},
            {$pull: {saved: this._id}}
        );

        next();
    }catch (error){
        next(error);
    }
})

module.exports = mongoose.model("Post", postSchema);