import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShowcaseModal from "../Home/ShowcaseModal";

function Secret() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(true);
    const handleOpenModal = () => {
        console.log("image clicked");
        setIsModalOpen(true); // Open the modal when the image is clicked
    };
    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    const _id = "dhki"
    const title = 'DongHa Kim';
    const post_descript = "김동하 그는 신이야"
    const title_image_small = "https://madcamp.dhki.kr/images/dongha.jpg"
    const images_origin = ["https://madcamp.dhki.kr/images/dongha.jpg", "https://madcamp.dhki.kr/images/dongha.jpg", "https://madcamp.dhki.kr/images/dongha.jpg", "https://madcamp.dhki.kr/images/dongha.jpg", "https://madcamp.dhki.kr/images/dongha.jpg", "https://madcamp.dhki.kr/images/dongha.jpg", "https://madcamp.dhki.kr/images/dongha.jpg", "https://madcamp.dhki.kr/images/dongha.jpg"]
    const images_small = ["https://madcamp.dhki.kr/images/dongha.jpg", "https://madcamp.dhki.kr/images/dongha.jpg", "https://madcamp.dhki.kr/images/dongha.jpg", "https://madcamp.dhki.kr/images/dongha.jpg", "https://madcamp.dhki.kr/images/dongha.jpg", "https://madcamp.dhki.kr/images/dongha.jpg", "https://madcamp.dhki.kr/images/dongha.jpg", "https://madcamp.dhki.kr/images/dongha.jpg"]
    const scripts = ["김동하 그는 신이야", "김동하 그는 신이야", "김동하 그는 신이야", "김동하 그는 신이야", "김동하 그는 신이야", "김동하 그는 신이야", "김동하 그는 신이야", "김동하 그는 신이야"]
    const owner = "김동하"
    const createdAt = "2000-10-18"

    return (
        <>
            <div className="fixed inset-0 bg-black">
                <div className="absolute top-0 left-0 p-6">
                    <button onClick={handleOpenModal} className="text-white font-bold text-sm">Open</button>
                </div>
                <div className="absolute top-0 right-0 p-6">
                    <button onClick={handleCloseModal} className="text-white font-bold text-sm">Close</button>
                </div>
                <div className="flex flex-col border rounded-xl bg-white relative">
                    <ShowcaseModal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        data={{ _id, title, post_descript, title_image_small, images_origin, images_small, scripts, owner, createdAt }}
                    />

                </div >
            </div>
        </>
    )
}

export default Secret;