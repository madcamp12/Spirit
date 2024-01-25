import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addComment, likePost, savePost } from '../../actions/postAction';
import { likeFill } from '../Header/SvgIcons';
import { Cookies } from 'react-cookie';
import { commentIcon, emojiIcon, likeIconOutline, moreIcons, saveIconFill, saveIconOutline, shareIcon } from './SvgIcons'
// import { Picker } from 'emoji-mart'
// import ScrollToBottom from 'react-scroll-to-bottom';
import axios from 'axios';
// import moment from 'moment';
import ShowcaseModal from './ShowcaseModal';

const ShowcaseItem = ({ _id, title, post_descript, likes, comments, title_image, images_origin, images_small, scripts, owner, savedBy, createdAt, setUsersDialog, setUsersList }) => {

    const dispatch = useDispatch();
    const commentInput = useRef(null);
    const cookies = new Cookies();

    const { user } = useSelector((state) => state.user);
    const { loading, post } = useSelector((state) => state.postDetails);

    const [likeCnt, setLikeCnt] = useState(likes.length);
    const [allLikes, setAllLikes] = useState(likes);
    const [allComments, setAllComments] = useState(comments);
    const [allSavedBy, setAllSavedBy] = useState(savedBy);

    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [comment, setComment] = useState("");
    const [viewComment, setViewComment] = useState(false);
    const [showEmojis, setShowEmojis] = useState(false);

    const [likeEffect, setLikeEffect] = useState(false);

    useEffect(() => {
        let flag = likes.some(likeUser => {return likeUser.name == user.name});
        if(flag){setLiked(true);}

        flag = savedBy.some(savedUser => {return savedUser.name == user.name});
        if(flag){setSaved(true);}
    }, []);

    const handleLike = async () => {
        
        // await dispatch(likePost(_id));
        const { data } = await axios.put(`https://madcamp.dhki.kr/posts/like/${_id}`, {token: cookies.get('token')});
        if(data.apply){
            setLiked(!liked);
            setLikeCnt(data.likes.length);
        }else {

        }
    }

    const handleComment = async (e) => {
        e.preventDefault();
        // await dispatch(addComment(_id, comment));
        setComment("");
        const { data } = await axios.get(`/api/v1/post/detail/${_id}`)
        setAllComments(data.post.comments)
    }

    const handleSave = async () => {
        // await dispatch(savePost(_id));
        
        const { data } = await axios.put(`https://madcamp.dhki.kr/posts/save/${_id}`, {token: cookies.get('token')});
        if(data.apply){
            setSaved(!saved);
            setAllSavedBy(data.post.savedBy)
        }
    }

    const handleLikeModal = () => {
        setUsersDialog(true);
        setUsersList(allLikes);
    }

    const setLike = () => {
        setLikeEffect(true)
        setTimeout(() => {
            setLikeEffect(false)
        }, 500)
        if (liked) {
            return;
        }
        handleLike();
    }

    useEffect(() => {
        setLiked(allLikes.some((u) => u._id === user._id))
    }, [allLikes]);

    useEffect(() => {
        setSaved(allSavedBy.some((id) => id === user._id))
    }, [allSavedBy]);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleImageClick = () => {
        console.log("image clicked");
        setIsModalOpen(true); // Open the modal when the image is clicked
    };
    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal
    };


    return (
        <div className="flex flex-col border rounded-xl bg-white relative">

            {/* <div className="flex justify-between px-3 py-2.5 border-b items-center">
                <div className="flex space-x-3 items-center">
                    <Link to={`/${owner.username}`}><img draggable="false" className="w-10 h-10 rounded-full object-cover" src={owner.avatar} alt="avatar" /></Link>
                    <Link to={`/${owner.username}`} className="text-black text-sm font-semibold">{owner.username}</Link>
                </div>
                <span className="cursor-pointer">{moreIcons}</span>
            </div> */}

            {/* post image container */}
            {/* <div className="relative flex items-center justify-center" style={{ width: '100%', height: '0', paddingBottom: '100%' }} onDoubleClick={setLike}> */}
            <div className="relative flex items-center justify-center rounded-tr-xl rounded-tl-xl" style={{ width: '100%', height: '0', paddingBottom: '100%' }} onClick={handleImageClick}>
                <img
                    draggable="false"
                    loading="lazy"
                    className="absolute top-0 left-0 w-full h-full object-cover object-center rounded-tr-xl rounded-tl-xl"
                    src={title_image}
                    alt="post image" />

                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 via-transparent to-black/50 rounded-tr-xl rounded-tl-xl"></div>

                <span className="absolute text-white text-4xl font-bold" style={{ top: '30px', left: '20px' }}>
                    <Link to={`/profile/${owner.username}`} className="text-4xl font-semibold hover:underline">@{owner.username}</Link>
                </span>
                <span className="absolute text-white text-2xl font-bold" style={{ bottom: '30px', right: '15px' }}>
                    <span className="text-2xl truncate">{title}</span>
                </span>

                {likeEffect &&
                    <img draggable="false" height="80px" className="likeEffect" alt="heart" src="https://img.icons8.com/ios-filled/2x/ffffff/like.png" />
                }
            </div>

            <ShowcaseModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                data={{ _id, title, post_descript, likes, comments, title_image, images_origin, images_small, scripts, owner, savedBy, createdAt }}
            />

            {/* like comment container */}
            <div className="flex flex-col px-4 space-y-1 border-transparent pb-2 mt-2 rounded-br-xl rounded-bl-xl">

                {/* icons container */}
                <div className="flex items-center justify-between py-2 ">
                    <div className="flex space-x-2">
                        <button onClick={handleLike}>{liked ? likeFill : likeIconOutline}</button>
                        <span className='font-semibold text-sm mt-0.5'>{likeCnt}</span>
                        {/* {shareIcon} */}
                    </div>
                    <button onClick={handleSave}>{saved ? saveIconFill : saveIconOutline}</button>
                </div>

                {/* likes  */}
                {/* <span onClick={handleLikeModal} className="font-semibold text-sm cursor-pointer">{allLikes.length} likes</span> */}

                {/* comment */}
                {/* <div className="flex flex-auto items-center space-x-1">
                    <Link to={`/${owner.username}`} className="text-sm font-semibold hover:underline">{owner.username}</Link>
                    <span className="text-sm truncate">{title}</span>
                </div> */}

                {/* time */}
                {/* {allComments.length > 0 ?

                    <span onClick={() => setViewComment(!viewComment)} className="text-[13px] text-gray-500 cursor-pointer">
                        {viewComment ? "Hide Comments" :
                            allComments.length === 1 ?
                                `View ${allComments.length} Comment` :
                                `View All ${allComments.length} Comments`
                        }
                    </span> :

                    <span className="text-[13px] text-gray-500">No Comments Yet!</span>

                } */}
                {/* <span className="text-xs text-gray-500 cursor-pointer">{moment(createdAt).fromNow()}</span> */}

                {/* {viewComment &&
                    <ScrollToBottom className="w-full h-52 overflow-y-auto py-1">
                        {allComments.map((c) => (
                            <div className="flex items-start mb-2 space-x-2" key={c._id}>
                                <img draggable="false" className="h-7 w-7 rounded-full object-cover mr-0.5" src={c.user.avatar} alt="avatar" />
                                <Link to={`/${c.user}`} className="text-sm font-semibold hover:underline">{c.user.username}</Link>
                                <p className="text-sm">{c.comment}</p>
                            </div>
                        ))}
                    </ScrollToBottom>
                } */}

            </div>

            {/* comment input container */}
            {/* <form onSubmit={handleComment} className="flex items-center justify-between p-3 w-full space-x-3">
                <span onClick={() => setShowEmojis(!showEmojis)} className="cursor-pointer">{emojiIcon}</span>

                {showEmojis && (
                    <div className="absolute bottom-12 -left-2">
                        <Picker
                            set="google"
                            onSelect={(e) => setComment(comment + e.native)}
                            title="Emojis"
                        />
                    </div>
                )}

                <input
                    className="flex-auto text-sm outline-none border-none bg-transparent"
                    type="text"
                    value={comment}
                    ref={commentInput}
                    required
                    onFocus={() => setShowEmojis(false)}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..." />
                <button type="submit" className={`${comment.trim().length < 1 ? 'text-blue-300' : 'text-primary-blue'} text-sm font-semibold`} disabled={comment.trim().length < 1}>Post</button>
            </form> */}

        </div >
    )
}

export default ShowcaseItem