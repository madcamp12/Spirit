import React, { useEffect, useState } from 'react'
import { exploreOutline, homeFill, homeOutline, likeFill, likeOutline, messageFill, messageOutline, postUploadOutline } from './SvgIcons'
import { Link, useLocation } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
import NewPost from './NewPost';
import { useSelector } from 'react-redux';
import SearchBox from './SearchBar/SearchBox';
import { ClickAwayListener } from '@mui/material';
import "./Header.css"

const Header = () => {

    const { user } = useSelector((state) => state.user);
    if(user){
        console.log(user);
        console.log(user.avatar);
    }else{
        console.log('no user found');
    }
    

    const [profileToggle, setProfileToggle] = useState(false);
    const [newPost, setNewPost] = useState(false);

    const location = useLocation();
    const [onHome, setOnHome] = useState(false);
    const [onChat, setOnChat] = useState(false);

    useEffect(() => {
        setOnHome(location.pathname === "/home")
        setOnChat(location.pathname.split('/').includes("direct"))
    }, [location]);

    return (
        <nav className="fixed top-0 w-full border-b bg-black z-10">
            {/* <!-- navbar container --> */}
            <div className="flex flex-row justify-between items-center py-2 px-3.5 sm:w-full sm:px-4 md:w-full md:px-6 xl:w-4/6 xl:px-8 mx-auto">

                {/* <!-- logo --> */}
                <Link to="/home"><img draggable="false" className="w-42 h-10 object-contain" src="logo/logo_header.png" alt="" /></Link>
                {/* <Link to="/home"><h1 className="text-3xl font-bold text-gray-800">SPIRIT</h1></Link> */}

                {/* <!-- search bar --> */}

                <SearchBox />

                {/* <!-- icons container  --> */}
                <div className="flex items-center space-x-6 sm:mr-5">
                    <Link to="/home">{profileToggle || !onHome ? homeOutline : homeFill}</Link>

                    <Link to="/direct/inbox">{onChat ? messageFill : messageOutline}</Link>

                    <div onClick={() => setNewPost(true)} className="cursor-pointer">{postUploadOutline}</div>

                    {/* <span className="hidden sm:block">{exploreOutline}</span> */}
                    {/* <span className="hidden sm:block">{likeOutline}</span> */}

                    <div onClick={() => setProfileToggle(!profileToggle)} className={`${profileToggle && 'border-black border' || (!onHome && !onChat) && 'border-black border'} rounded-full cursor-pointer h-7 w-7 p-[0.5px]`}><img draggable="false" loading="lazy" className="w-full h-full rounded-full object-cover" src={user.avatar} alt="" /></div>
                </div>

                {profileToggle &&
                    <ProfileDetails setProfileToggle={setProfileToggle} />
                }

                <NewPost newPost={newPost} setNewPost={setNewPost} />

            </div>
        </nav>
    )
}

export default Header