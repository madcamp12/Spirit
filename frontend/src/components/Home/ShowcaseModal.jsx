import React, { useEffect } from 'react';
import "./HomeComponents.css";
import ShowcaseThreeItem from '../ShowcaseThree/ShowcaseThreeItem';
import { useSelector } from 'react-redux';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ShowcaseModal = ({ isOpen, onClose, data }) => {

    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const cookie = new Cookies();

    const deletePost = async () => {
        const body = {
            token: cookie.get('token')
        };

        const { data } = await axios.post(`https://madcamp.dhki.kr/posts/delete/${_id}`, body);
        if(data.delete){
            window.location.reload(true);
        }else{
            alert('Server Error!');
        }
    }

    const handleEscKeyPress = (e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };
    useEffect(() => {
        document.addEventListener('keydown', handleEscKeyPress);
        return () => {
            document.removeEventListener('keydown', handleEscKeyPress);
        };
    }, []);

    if (!isOpen || !data) return null;

    const { _id, title, post_descript, likes, comments, title_image, images_origin, images_small, scripts, owner, savedBy, createdAt } = data;

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                { owner._id == user._id && (
                    <button onClick={deletePost} className="absolute top-4 left-4 text-white text-lg cursor-pointer">Delete</button>
                )}
                <button onClick={onClose} className="absolute top-4 right-4 text-white text-lg cursor-pointer">Close</button>
                <div className="bg-white w-7/10 h-7/10 overflow-auto flex rounded-2xl">
                    {/* <div className="w-2/3 flex justify-center items-center"> */}
                    <div className="flex justify-center items-center">
                        <ShowcaseThreeItem _id={_id} title={title} post_descript={post_descript} title_image={title_image} position={0} images_origin={images_origin} images_small={images_small} scripts={scripts} owner={owner} createdAt={createdAt}/>
                    </div>

                </div>
            </div>
        </>
    );
};

export default ShowcaseModal;
