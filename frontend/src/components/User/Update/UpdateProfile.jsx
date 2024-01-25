import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearErrors, loadUser, updateProfile } from '../../../actions/userAction';
import { UPDATE_PROFILE_RESET } from '../../../constants/userConstants';
import MetaData from '../../Layouts/MetaData';
import axios from 'axios';
import { Cookies } from 'react-cookie';

const UpdateProfile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const avatarInput = useRef(null);

    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [website, setWebsite] = useState("");
    const [bio, setBio] = useState(user.bio);
    const [email, setEmail] = useState("");
    const [oldAvatar, setOldAvatar] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("");

    const cookies = new Cookies();

    const handleUpdate = async (e) => {
        e.preventDefault();

        const userCheck = /^[a-z0-9_.-]{6,25}$/igm;

        if (!userCheck.test(username)) {
            toast.error("Invalid Username");
            return;
        }

        const body = {
            username: username,
            bio: bio,
            token: cookies.get('token')
        }

        if(user.username != username){
            const {data} = await axios.get(`https://madcamp.dhki.kr/users/check/${username}`);

            if(data.available){

                dispatch(updateProfile(body));

            }else{
                alert('you can not use this username!');
                return;
            }
        }else{
            dispatch(updateProfile(body));
        }
        
        
    }

    const handleAvatarChange = (e) => {
        const reader = new FileReader();
        setAvatar("");
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
        setAvatar(e.target.files[0]);
    }

    useEffect(() => {
        if (user) {
            setName(user.name);
            setUsername(user.username);
            setWebsite(user.website);
            setBio(user.bio);
            setEmail(user.email);
            setOldAvatar(user.avatar);
        }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            toast.success("Profile Updated");
            dispatch(loadUser());
            navigate(`/profile/${username}`);

            dispatch({ type: UPDATE_PROFILE_RESET });
        }
    }, [dispatch, user, error, isUpdated]);

    return (
        <>
            <MetaData title="Edit Profile • SPIRIT" />

            <form
                onSubmit={handleUpdate}
                encType="multipart/form-data"
                className="flex flex-col gap-6 py-4 px-4 sm:py-10 sm:px-24 sm:w-3/4"
            >
                <div className="flex items-center gap-8 ml-20">
                    <div className="w-11 h-11">
                        <img draggable="false" className="w-full h-full rounded-full border object-cover" src={avatarPreview ? avatarPreview : oldAvatar} alt="avatar" />
                    </div>
                    <div className="flex flex-col gap-0">
                        <span className="text-xl">{username}</span>
                        {/* <label onClick={(e) => avatarInput.current.click()} className="text-sm font-medium text-primary-blue cursor-pointer">Change Profile Photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            name="avatar"
                            ref={avatarInput}
                            onChange={handleAvatarChange}
                            className="hidden" /> */}
                    </div>
                </div>
                <div className="flex w-full gap-8 text-right items-center">
                    <span className="w-1/4 font-semibold">Name</span>
                    <input
                        className="border rounded p-1 w-3/4"
                        type="text"
                        placeholder="Name"
                        value={name}
                        readOnly
                        required
                    />
                </div>
                <div className="flex w-full gap-8 text-right items-center">
                    <span className="w-1/4 font-semibold">Username</span>
                    <input
                        className="border rounded p-1 w-3/4"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="flex w-full gap-8 text-right items-start">
                    <span className="w-1/4 font-semibold mt-1">Bio</span>
                    <textarea
                        className="border rounded outline-none resize-none p-1 w-3/4"
                        name="bio"
                        placeholder="Bio"
                        rows="3"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    >
                    </textarea>
                </div>
                <div className="flex w-full gap-8 text-right items-center">
                    <span className="w-1/4 font-semibold">Email</span>
                    <input
                        className="border rounded p-1 w-3/4"
                        type="email"
                        placeholder="Email"
                        value={email}
                        readOnly
                        required
                    />
                </div>
                <button type="submit" disabled={loading} className="bg-primary-blue font-medium rounded text-white py-2 w-40 mx-auto text-sm mt-5">Submit</button>
            </form>
        </>
    )
}

export default UpdateProfile