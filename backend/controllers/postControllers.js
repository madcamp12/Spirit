const User = require('../models/userModel');
const Post = require('../models/postModel');
const sharp = require('sharp');
const axios = require('axios');
const fs = require('fs');

const deleteImg = async (imgUrl) => {
    console.log(imgUrl);
    if(!imgUrl){
        return true;
    }

    const img = imgUrl.substring(31, imgUrl.length);
    const path = `/app/images/${img}`;

    console.log(path);

    try {
        fs.statSync(path);
    } catch (error) {
        throw error;
    }

    try{
        fs.unlinkSync(path);
    }catch (error){
        throw error;
    }

    return true;
}

exports.deletePost = async (req, res) => {
    const post = await Post.findById(req.params.id).populate('owner');
    
    // check post's owner
    if(!post|| post.owner.username != req.user.username){
        return res.status(401);
    }

    try{
        deleteImg(post.title_image);

        if(post.title_image_small){
            deleteImg(post.title_image_small);
        }

        for(origin of post.images_origin){
            deleteImg(origin);
        }
        for(small of post.images_small){
            deleteImg(small);
        }
    } catch(error){
        console.log(error);
        // return res.status(500).json({delete: false});
    }
    

    Post.deleteOne({_id: post._id})
        .then(result => {
            console.log('delete done');
            return res.status(200).json({delete: true});
        })
        .catch(error => {
            console.log('in deletePost: cannot delete post');
            console.log(error);

            return res.status(500).json({delete: false});
        })
}

exports.getStoriesOfFollowing = async (req, res) => {
    const user = req.user;
    let ret = [];
    for(f of user.following){
        const post = await Post.findOne({owner: f}).populate('owner').sort({createdAt: -1});
        
        if(!post){
            continue;
        }

        ret = [...ret, {
            owner: post.owner,
            poster: post.title_image_small ? post.title_image_small : post.title_image,
            _id: post._id,
            title: post.title,
            c: post.createdAt
        }];
    }

    ret.sort((a, b) => b.c - a.c);
    return res.status(200).json({stories: ret});
}

exports.getStoriesOfAll = async (req, res) => {

    Post.find().populate("owner").sort({ createdAt: -1 })
    .then(posts => {
        let ret = [];
        for(post of posts){
            const tmp = {
                owner: post.owner,
                poster: post.title_image_small ? post.title_image_small : post.title_image,
                _id: post._id,
                title: post.title,
            };
            ret = [...ret, tmp];
        }
        return res.status(200).json({stories: ret});
    })
    .catch(error => {
        console.log('in GetStoriesOfAll: cannot find posts');
        console.log(error);
    })
}

exports.fetchPostsOfAll = async (req, res) => {
    // const user = await User.findById(req.user._id);

    const currentPage = Number(req.query.page) || 1;
    const skipPosts = 4 * (currentPage - 1);

    let ret = [];

    Post.find().populate("owner likes").populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    }).sort({ createdAt: -1 }).limit(4).skip(skipPosts)
    .then(posts => {
        ret = posts.filter(post => post.owner.username != req.user.username);
        if(ret.length == 0){
            return res.status(200).json({success: false});
        }else{
            return res.status(200).json({success: true, posts: ret});    
        }

        // if(posts.length  == 0){
        //     return res.status(200).json({success: false});
        // }

        // return res.status(200).json({success: true, posts: posts});
    })
    .catch(error => {
        console.log('in fetchPostOfAll: can not find/sort/ posts');
        console.log(error);
    })
}

exports.getPostInfo = async (req, res) => {
    const id = req.params.id;

    Post.findById(id).populate('likes')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .populate('owner')
        .populate('savedBy')

        .then(post => {
            return res.status(200).json({post: post});
        })
        .catch(error => {
            console.log('in post-detail: cannot populate(or find) post.');
            return res.status(500).json({err: error})
        })
}

exports.getAllPost = async (req, res) => {
    const posts = await Post.find();

    return res.status(200).json({
        posts
    });
}

// make new post
exports.newPost = async (req, res) => {
    const owner_id = req.user._id;

    const { title, descript } = req.body;

    let title_image = '';
    let title_image_small = '';
    let images_origin = [];
    let images_small = [];
    let scripts = [];
    if(req.files){
        for(let i = 0; i < req.files.length; i++){
            const filename = req.files[i].filename;

            if(i == 0){
                title_image = `https://madcamp.dhki.kr/images/${filename}`;
                title_image_small = `https://madcamp.dhki.kr/images/${filename}_small`;

                await sharp(`/app/images/${filename}`).resize({width: 800, height: 800, fit: 'cover'}).toFile(`/app/images/${filename}_small`);
                continue;
            }
    
            images_origin = [...images_origin, `https://madcamp.dhki.kr/images/${filename}`];
            images_small = [...images_small, `https://madcamp.dhki.kr/images/${filename}_small`];
    
            const small_img_path = `/app/images/${filename}_small`;

            const metadata = await sharp(`/app/images/${filename}`).metadata();
            const shouldRotate = metadata ? metadata.orientation && [5, 6, 7, 8].includes(metadata.orientation) : false;
            if(metadata){
                let script = `format: ${metadata.format}\n`;
                script += `size: ${metadata.width} x ${metadata.height}\n`;
                script += `channels: ${metadata.channels}\n`;
                script += `density: ${metadata.density}\n`;

                scripts = [...scripts, script];
            }else{
                const script = '';
                scripts = [...scripts, script];
            }
            
            if(shouldRotate){
                await sharp(`/app/images/${filename}`).rotate().resize({width: 800, height: 800, fit: 'cover'}).toFile(small_img_path);
            }else{
                await sharp(`/app/images/${filename}`).resize({width: 800, height: 800, fit: 'cover'}).toFile(small_img_path);
            }
        } 
    }

    const newPost = new Post({
        title: title,
        title_image: title_image,
        title_image_small: title_image_small,
        post_descript: descript,
        images_origin: images_origin,
        images_small: images_small,
        scripts: scripts,
        owner: owner_id,
    });

    newPost.save()
        .then(async (post) => {
            const user = await User.findById(req.user.id);
            user.posts.push(post._id);
            await user.save();

            return res.status(200).json({upload: true});
        })
        .catch(error => {
            console.log('in new-post: can not make new post.');
            console.log(error);
            return res.status(500).json({upload: false, err: error});
        })
}

// make comment to post
exports.makeComment = async (req, res) => {
    const post_id = req.params.id;
    const post = Post.findById(post_id);

    if(!post){
        return res.status(400).json({error: `there's no post`});
    }

    post.comments.push({
        user: req.user._id,
        comment: req.body.comment
    });
    
    post.save()
        .then(post => {
            return res.status(200).json({apply: true});
        })
        .catch(error => {
            return res.status(500).json({apply: false, error: 'error in saving'});
        })
}

// like or unlike the post
exports.likeUnlike = async (req, res) => {
    const post = await Post.findById(req.params.id).populate('likes');

    if(!post){
        return res.status(400).json({error: `there's no post`});
    }

    const flag = post.likes.some(user => {return user.name == req.user.name});
    if(flag){
        const idx = post.likes.indexOf(req.user._id);
        post.likes.splice(idx, 1);

        post.save()
            .then(post => {
                return res.status(200).json({apply: true, likes: post.likes});
            })
            .catch(error => {
                console.log('in likeUnlike: can not save post');
                console.log(error);

                return res.status(500).json({apply: false, error: 'error in saving'});
            })
    }else{
        post.likes.push(req.user._id);

        post.save()
            .then(post => {
                return res.status(200).json({apply: true, likes: post.likes});
            })
            .catch(error => {
                console.log('in likeUnlike: can not save post');
                console.log(error);

                return res.status(500).json({apply: false, error: 'error in saving'});
            })
    }
}

exports.saveUnsave = async (req, res) => {
    const post = await Post.findById(req.params.id).populate('savedBy');
    const user = await User.findById(req.user._id).populate('saved');

    if(!post){
        return res.status(400).json({error: `there's no post`});
    }

    const flag = post.savedBy.some(user => {return user.name == req.user.name});

    if(flag){
        let idx = post.savedBy.indexOf(req.user._id);
        post.savedBy.splice(idx, 1);

        idx = user.saved.indexOf(post._id);
        user.saved.splice(idx, 1);

        await user.save();

        post.save()
            .then(post => {
                return res.status(200).json({apply: true});
            })
            .catch(error => {
                return res.status(500).json({apply: false, error: 'error in saving'});
            })
    }else{
        post.savedBy.push(req.user._id);
        user.saved.push(post._id);

        await user.save();

        post.save()
            .then(post => {
                return res.status(200).json({apply: true});
            })
            .catch(error => {
                return res.status(500).json({apply: false, error: 'error in saving'});
            })
    }
}
