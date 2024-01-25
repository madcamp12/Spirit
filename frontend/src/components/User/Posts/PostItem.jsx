import { useEffect, useRef, useState } from 'react'
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { Dialog } from '@mui/material';
import { Link } from 'react-router-dom';
import { commentIcon, emojiIcon, likeIconOutline, saveIconFill, saveIconOutline, shareIcon } from '../../Home/SvgIcons';
import { likeFill } from '../../Header/SvgIcons';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, clearErrors, deletePost, likePost, savePost } from '../../../actions/postAction';
// import { Picker } from 'emoji-mart';
import { metaballsMenu } from '../SvgIcons';
// import moment from 'moment';
import ShowcaseModal from '../../Home/ShowcaseModal';

const PostItem = ({ _id, title, post_descript, likes, comments, title_image, images_origin, images_small, scripts, owner, savedBy, createdAt }) => {

    const dispatch = useDispatch();
    const commentInput = useRef(null);

    const [open, setOpen] = useState(false);
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [comment, setComment] = useState("");
    const [showEmojis, setShowEmojis] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const [likeEffect, setLikeEffect] = useState(false);

    const { user } = useSelector((state) => state.user);

    const handleLike = () => {
        setLiked(!liked);
        dispatch(likePost(_id));
    }

    const handleComment = (e) => {
        e.preventDefault();
        dispatch(addComment(_id, comment));
        setComment("");
    }

    const handleSave = () => {
        setSaved(!saved);
        dispatch(savePost(_id));
    }

    const handleDeletePost = () => {
        dispatch(deletePost(_id));
        setDeleteModal(false)
    }

    useEffect(() => {
        setLiked(likes.some((id) => id === user._id))
    }, [likes]);

    useEffect(() => {
        setSaved(savedBy.some((id) => id === user._id))
    }, [savedBy]);

    const closeDeleteModal = () => {
        setDeleteModal(false)
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

    return (
        <>
            <div onClick={() => setOpen(true)} className="group w-full h-32 sm:h-72 max-h-72 flex justify-center items-center bg-gray-100 hover:bg-black cursor-pointer relative z-0">
                <img draggable="false" loading="lazy" className="hover:opacity-75 group-hover:opacity-75 cursor-pointer object-cover h-full w-full" src={title_image} alt="Post" />
                <div className="hidden group-hover:flex text-white absolute pointer-events-none gap-4">
                    {/* <span><FavoriteIcon /> {likes.length}</span> */}
                    {/* <span><ModeCommentIcon /> {comments.length}</span> */}
                </div>
            </div>

            <ShowcaseModal
                isOpen={open}
                onClose={() => setOpen(false)} 
                data={{ _id, title, post_descript, likes, comments, title_image, images_origin, images_small, scripts, owner, savedBy, createdAt }}
            />
        </>
    )
}

export default PostItem