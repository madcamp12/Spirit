import { Dialog, LinearProgress } from '@mui/material'
// import { Picker } from 'emoji-mart';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addNewPost, clearErrors } from '../../actions/postAction';
import { NEW_POST_RESET } from '../../constants/postConstants';
import { emojiIcon } from '../Home/SvgIcons';

const NewPost = ({ newPost, setNewPost }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, success, error } = useSelector((state) => state.newPost);
    const { user } = useSelector((state) => state.user);

    // // const [postImage, setPostImage] = useState("");
    // // const [postPreview, setPostPreview] = useState("");
    const [postImages, setPostImages] = useState([]);
    const [postPreviews, setPostPreviews] = useState([]);
    const [title, setTitle] = useState("");
    const [descript, setDescript] = useState("");
    // // const [showEmojis, setShowEmojis] = useState(false);
    const [dragged, setDragged] = useState(false);

    const [selectedFileNames, setSelectedFileNames] = useState([]);

    const handleDragChange = () => {
        setDragged(!dragged);
    }

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (postImages.length + files.length > 10) {
            toast.error("You can only upload up to 10 images.");
            return;
        }

        // 새로운 파일들의 파일명과 미리보기 URL을 생성합니다.
        const newFileNames = files.map(file => file.name);
        const newPreviews = files.map(file => URL.createObjectURL(file));

        // 기존 상태에 새로운 파일들을 추가합니다.
        setSelectedFileNames(prevFileNames => [...prevFileNames, ...newFileNames]);
        setPostImages(prevImages => [...prevImages, ...files]);
        setPostPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
    };


    // const newPostSubmitHandler = (e) => {
    //     e.preventDefault();
    //     if (!postImage) {
    //         toast.error("Select Image");
    //         return
    //     }
    //     if (!title.trim()) {
    //         toast.error("Empty Title");
    //         return
    //     }
    //     if (!discript.trim()) {
    //         toast.error("Empty Caption");
    //         return
    //     }

    //     const formData = new FormData();

    //     formData.set("title", title);
    //     formData.set("discript", discript);
    //     formData.set("images", postImage);

    //     dispatch(addNewPost(formData));
    // }
    const confirmDelete = (e, index) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this image?")) {
            handleImageDelete(index);
        }
    }
    const handleImageDelete = (indexToDelete) => {
        // 선택된 이미지를 제거합니다.
        setPostPreviews(prevPreviews => prevPreviews.filter((_, index) => index !== indexToDelete));
        setSelectedFileNames(prevFileNames => prevFileNames.filter((_, index) => index !== indexToDelete));
        setPostImages(prevImages => prevImages.filter((_, index) => index !== indexToDelete));
    };

    const newPostSubmitHandler = (e) => {
        e.preventDefault();

        if (postImages.length === 0) {
            toast.error("Select at least one image");
            return;
        }

        dispatch(addNewPost({title, descript, postImages}));
    };


    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            toast.success("Post Shared");
            dispatch({ type: NEW_POST_RESET });
            setNewPost(false)
            navigate("/intro");

            setPostImages("");
            setPostPreviews("");
            setTitle("");
            setDescript("");
        }
    }, [dispatch, error, success, navigate]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageTitle, setSelectedImageTitle] = useState(null);

    const openModal = (title, selectedImage) => {
        setSelectedImage(selectedImage);
        setSelectedImageTitle(title);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
        setSelectedImageTitle(null);
    };

    const handleImageClick = (index) => {
        const selectedImage = {
            src: postPreviews[index],
            title: selectedFileNames[index],
        };
        openModal(title, selectedImage);
    };
    const handleModalOutsideClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };


    return (
        <Dialog open={newPost} onClose={() => setNewPost(false)} maxWidth='xl'>
            <div className="flex flex-col sm:w-screen max-w-4xl">
                <div className="bg-white py-3 border-b px-4 flex justify-between w-full">
                    <span className="font-medium text-sm mt-2">Create new Showcase</span>
                    {/* <button onClick={newPostSubmitHandler} disabled={loading} className="text-blue-500 font-medium">Share</button> */}
                    <button onClick={newPostSubmitHandler} disabled={loading} className="bg-primary-blue text-white px-6 py-1.5 rounded font-medium hover:drop-shadow-lg uppercase text-sm tracking-wider">Post</button>
                </div>
                {loading && <LinearProgress />}
                <div className="grid grid-cols-8 grid-rows-1 bg-white h-48 sm:h-[12vh] w-full border-b">
                    {/* <img draggable="false" className="object-contain h-full w-full" src={postPreview} alt="post" /> */}
                    {postPreviews.map((preview, index) => (
                        <div key={index} className={'w-full h-full relative'} onClick={() => handleImageClick(index)}>
                            <img src={preview} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                            {index === 0 && (
                                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 text-white">
                                    <p className='text-sm'>
                                        POSTER<br />IMAGE
                                    </p>
                                </div>
                            )}
                            <div className="absolute bottom-0 right-0 p-2 flex items-center justify-center text-white text-sm cursor-pointer" onClick={(e) => confirmDelete(e, index)}>
                                X
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex sm:flex-row sm:items-start items-center flex-col w-full">

                    <div onDragEnter={handleDragChange} onDragLeave={handleDragChange} className={`${dragged && 'opacity-40'} relative bg-white h-36 sm:h-[70vh] w-full flex flex-col gap-2 items-center justify-center `}>
                        <svg aria-label="Icon to represent media such as images or videos" color="#262626" fill="#262626" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
                        <p className="text-xl">Drag or Select photos here</p>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            multiple
                            className="absolute h-full w-full opacity-0"
                        />
                    </div>


                    <div className="flex flex-col border-l sm:h-[70vh] w-full bg-white">

                        <div className="flex gap-3 px-3 py-2 items-center border-b">
                            <img draggable="false" className="w-11 h-11 rounded-full object-cover" src={user.avatar} alt="avatar" />
                            <span className="text-black text-sm font-semibold">@{user.username}</span>
                        </div>


                        <div className="p-3 w-full border-b relative">
                            <textarea
                                className="outline-none resize-none h-32 sm:h-auto text-sm"
                                placeholder="Write a Title for your showcase"
                                name="title"
                                cols="40"
                                rows="4"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            >
                            </textarea>
                        </div>
                        <div className="p-3 w-full border-b relative">
                            <textarea
                                className="outline-none resize-none h-32 sm:h-auto text-sm"
                                placeholder="Write a Description for your showcase"
                                name="descript"
                                cols="40"
                                rows="10"
                                value={descript}
                                onChange={(e) => setDescript(e.target.value)}
                            >
                            </textarea>
                        </div>
                        <div className="p-3 w-full relative">
                            {/* <label className="block mb-4">
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-slate-500
                                    file:mr-3 file:py-2 file:px-6
                                    file:rounded-full file:border-0
                                    file:text-sm file:cursor-pointer file:font-semibold
                                    file:bg-purple-100 file:text-purple-700
                                    hover:file:bg-purple-200
                                    "/>
                            </label> */}
                            <div className="mt-2">
                                <div className="text-black text-sm mb-2">
                                    <p>Selected Photos:</p>
                                </div>
                                {selectedFileNames.map((name, index) => (
                                    <div key={index} className="text-gray-500 text-sm">
                                        {name}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" onClick={handleModalOutsideClick}>
                    <div className="absolute top-0 left-0 p-6">
                        <h3 className="text-lg text-white font-semibold">{selectedImage.title}</h3>
                    </div>
                    <div className="bg-transparent rounded w-[90%] h-[80%] relative flex items-center justify-center">
                        <img src={selectedImage.src} alt="Selected" className="max-w-full max-h-full object-contain rounded" />
                    </div>

                    <div className="absolute top-0 right-0 p-6">
                        <button onClick={closeModal} className="text-white font-bold text-sm">Close</button>
                    </div>
                </div>
            )}

        </Dialog>
    )
}

export default NewPost