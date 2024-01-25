import React from "react";
import Header from "../components/Header/Header";
import Showcase from "../components/Home/Showcase";
import Sidebar from "../components/Home/Sidebar/Sidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, isAuthenticated, error, user } = useSelector((state) => state.user);


    useEffect(() => {
        if (isAuthenticated) {
            navigate(`/home`)
        } else {
            navigate(`/intro`)
        }
    }, [dispatch, error, isAuthenticated, navigate]);
    return (
        <>
            <Header />
            <div className="flex h-full md:w-4/5 lg:w-4/6 mt-14 mx-auto">
                <Sidebar />
                <Showcase />
            </div>
        </>
    )
}

export default Home;