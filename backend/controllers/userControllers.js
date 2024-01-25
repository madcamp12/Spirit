const User = require('../models/userModel');
const Post = require('../models/postModel');
const axios = require('axios');

exports.searchUser = async (req, res) => {
    const {keyword} = req.query;

    // find users
    User.find({$or: [
        {username: {$regex: keyword, $options: 'i'}},
        {name: {$regex: keyword, $options: 'i'}},
    ]})
        .then(users => {
            res.status(200).json({users: users});
        })
        .catch(error => {
            console.log('in SearchUser: error occur when finding users.');
            console.log(error);

            res.status(500).json({error: 'error in finding user'});
        })
}


// get access token from kakao
const getAccessToken = async (req) => {
    const qs = require('querystring');
    const {redirect_uri, code} = req.body;
    try{
        const data = {
            grant_type: 'authorization_code',
            client_id: process.env.KAKAO_RESTAPI_KEY,
            redirect_uri: redirect_uri,
            code: code
        };
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        }
    
        const formData = qs.stringify(data)

        const response = await axios.post('https://kauth.kakao.com/oauth/token', formData, {headers})
        const {access_token} = response.data;

        return access_token;
    } catch(error){
        // console.log(error);
        return null;
    }
}

// return token to user
exports.loginWithKakao = async (req, res) => {
    const access_token = await getAccessToken(req);
    console.log(`access token: ${access_token}`);

    if(access_token == null){ // if cannot get access token?
        return res.status(500).json({login: false, msg: 'cannot get access token'});
    }

    const headers = {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };

    axios.get('https://kapi.kakao.com/v2/user/me', {headers})
        .then(async (response) => {
            const { id, kakao_account } = response.data;
            const user_email = kakao_account['email'];
            const user_name = kakao_account['profile']['nickname'];
            const user_image = kakao_account['profile']['profile_image_url'];

            const client = await User.findOne({email: user_email});
            if(client){ // user is exist. make jwt token
                if(client.avatar != user_image){
                    client.avatar = user_image;
                    client.save()
                        .then(client => {
                            const token = client.generateToken();
                            return res.status(200).json({
                                token: token,
                                name: client.name,
                                avatar: client.avatar,
                                bio: client.bio,
                                username: client.username,
                                posts: client.posts,
                                followers: client.followers,
                                following: client.following,
                                email: client.email,
                                _id: client._id
                            });
                        })
                        .catch(error => {
                            return res.status(500).json({
                                login: false,
                                msg: error
                            });
                        })
                }else{
                    const token = client.generateToken();
                    
                    return res.status(200).json({
                    token: token,
                    name: client.name,
                    avatar: client.avatar,
                    username: client.username,
                    bio: client.bio,
                    posts: client.posts,
                    followers: client.followers,
                    following: client.following,
                    email: client.email,
                    _id: client._id
                    });
                }

            }else{ // make user and make jwt token
                const new_client = new User({
                    name: user_name,
                    email: user_email,
                    avatar: user_image ? user_image : '', // 기본 avatar url이 필요함
                    username: id,
                });

                new_client.save()
                    .then(savedUser => {
                        console.log(savedUser);
                        const token = savedUser.generateToken();

                        return res.status(200).json({
                            token: token,
                            name: savedUser.name,
                            avatar: savedUser.avatar,
                            username: id,
                            bio: savedUser.bio,
                            posts: savedUser.posts,
                            followers: savedUser.followers,
                            following: savedUser.following,
                            email: savedUser.email,
                            _id : savedUser._id
                        });
                    })
                    .catch(error => {
                        // console.log(`error: ${error}`);

                        return res.status(500).json({
                            login: false,
                            msg: error
                        });
                    })
            }
        })
        .catch(error => {
            console.log(`error`);
            return res.status(500).json({login: false, msg: error});
        })
};

exports.getUserDetailById = async (req, res) => {
    const {userid} = req.params;

    User.findById(userid).populate("followers following").populate({
        path: 'posts',
        populate: {
            path: 'comments',
            populate: {
                path: 'user'
            }
        },
    }).populate({
        path: 'posts',
        populate: {
            path: 'owner'
        }
    }).populate({
        path: 'saved',
        populate: {
            path: 'comments',
            populate: {
                path: 'user'
            }
        },
    }).populate({
        path: 'saved',
        populate: {
            path: 'owner'
        }
    })
    .then(user => {
        return res.status(200).json({
            user: user
        });
    })
    .catch(error => {
        return res.status(500).json({
            error: `there's no user`
        });
    })
}

// get user's detail inoformation
exports.getUserDetail = async (req, res) => {
    const {username} = req.params;

    User.findOne({username: username}).populate("followers following").populate({
        path: 'posts',
        populate: {
            path: 'comments',
            populate: {
                path: 'user'
            }
        },
    }).populate({
        path: 'posts',
        populate: {
            path: 'owner'
        }
    }).populate({
        path: 'saved',
        populate: {
            path: 'comments',
            populate: {
                path: 'user'
            }
        },
    }).populate({
        path: 'saved',
        populate: {
            path: 'owner'
        }
    })
    .then(user => {
        return res.status(200).json({
            user: user
        });
    })
    .catch(error => {
        return res.status(500).json({
            error: `there's no user`
        });
    })
}

// check if there's username of request
exports.checkUsername = async (req, res) => {
    const username = req.params.username;

    User.findOne({username: username})
        .then(user => {
            if(user == null){
                return res.status(200).json({available: true});
            }else{
                return res.status(200).json({available: false});
            }
        })
}

// update username
exports.updateUser = async (req, res) => {
    const { username, bio } = req.body;
    const user = req.user;

    user.username = username;
    user.bio = bio;

    user.save()
        .then(user => {
            return res.status(200).json({success: true});
        })
        .catch(error => {
            console.log('in updateUser')
            return res.status(200).json({success: false});
        })
}

// follow or unfollow user
exports.followUnfollow = async (req, res) => {
    const you = await User.findById(req.params.id).populate("followers");
    const me = await User.findById(req.user._id);

    if(!you){
        console.log('in followUnfollow: can not find "you".');
        return res.status(400).json({err: `there's no user`});
    }

    const flag = you.followers.some(follwer => {return follwer.name == req.user.name});
    if(flag){ //  if i follow you? : disconnect follow
        let idx = you.followers.indexOf(req.user._id);
        you.followers.splice(idx, 1);

        idx = me.following.indexOf(req.params.id);
        me.following.splice(idx, 1);

        try{
            await you.save();
            await me.save();

            return res.status(200).json({success: true, message: 'followed'});
        }catch(error) {
            console.log('in followUnfollow: can not save status');
            return res.status(500).json({})
        }

    }else{ //  if i don't follow you? : make follow connections
        you.followers.push(req.user._id);
        me.following.push(req.params.id);

        try{
            await you.save();
            await me.save();

            return res.status(200).json({success: true, message: 'unfollowed'});
        }catch(error) {
            console.log('in followUnfollow: can not save status');
            return res.status(500).json({})
        }
        
    }
}

exports.getInfoWithToken = async (req, res) => {
    return res.status(200).json({
        user: {
            name: req.user.name,
            avatar: req.user.avatar,
            username: req.user.username,
            posts: req.user.posts,
            bio: req.user.bio,
            followers: req.user.followers,
            following: req.user.following,
            email: req.user.email,
            _id: req.user._id
        }});
}