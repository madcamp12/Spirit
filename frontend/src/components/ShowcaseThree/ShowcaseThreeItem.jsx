import React, { useEffect, useRef, useState, Suspense } from "react";
import PictureFrame from "../pictureFrame/PictureFrame";
import PosterFrame from "../pictureFrame/PosterFrame";
import MarbleWall from "../marbleWall/MarbleWall";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import WhiteWall from "../whiteWall/WhiteWall";
import { CameraAnimation } from "./CameraAnimation";
import { Loading } from "./Loading";
import { sceneState } from './store';
import { cameraPositions } from "./Positions";
import { Lights } from "./Lights";
import * as THREE from 'three';
import { Sky } from '@react-three/drei';
import SnapshotModal from "../Home/SnapshotModal";
import { useNavigate } from "react-router-dom";

const CameraMovementChecker = ({ onCameraStop }) => {
    // 카메라의 현재 위치와 회전값을 저장할 상태
    const { camera } = useThree();

    useFrame(() => {
        const newPosition = camera.position.toArray();
        if (newPosition[0] < -7.19) {
            onCameraStop();
        } else { }
    });
    return null; // 이 컴포넌트는 시각적 요소를 렌더링하지 않습니다.
};

function ShowcaseThreeItem({ _id, title, post_descript, title_image, position, images_origin, images_small, scripts, owner, createdAt }) {
    const [cameraPosition, setCameraPosition] = useState(position);
    const [isCameraStopped, setIsCameraStopped] = useState(false);

    const navigate = useNavigate();

    const numImages = images_origin.length;
    console.log("numImages: ", numImages)
    for (let i = 0; i < numImages; i++) {
        console.log("Images: ", images_origin[i])
    }

    const [winWidth, setWinWidth] = useState(window.innerWidth);
    const [winHeight, setWinHeight] = useState(window.innerHeight);

    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedScript, setSelectedScript] = useState(null);

    useEffect(() => {
        sceneState.camera = cameraPositions[position];
        setCameraPosition(position);
        const resizing = () => {
            setWinWidth(window.innerWidth);
            setWinHeight(window.innerHeight);
        }
        window.addEventListener('resize', resizing);

        resizing();

        return () => {
            window.removeEventListener('resize', resizing);
        }
    }, [])

    useEffect(() => {
        setShowModal(false);
        const timer = setTimeout(() => {
            if (cameraPosition === 0) return;
            setSelectedImage(images_origin[cameraPosition - 1]);
            setSelectedScript(scripts[cameraPosition - 1]);
            setShowModal(true);
        }, 2000);

        return () => {
            clearTimeout(timer);
        };
    }, [cameraPosition]);

    const frameWidth = 4; // Width of each PictureFrame
    const gapBetweenFrames = 4; // Gap between frames

    // Calculate the total wall length based on the number of images
    // const wallLength = imageList.length * (frameWidth + gapBetweenFrames * 1.5);
    const wallLength = 500;

    const handleRightClick = () => {
        const currnetPostion = sceneState.camera.num;
        if (currnetPostion < numImages) {
            sceneState.camera = cameraPositions[currnetPostion + 1];
        }
        setCameraPosition(cameraPosition + 1);
        setIsCameraStopped(false);
    };
    const handleLeftClick = () => {
        const currnetPostion = sceneState.camera.num;
        if (currnetPostion > 0) {
            sceneState.camera = cameraPositions[currnetPostion - 1];
        }
        setCameraPosition(cameraPosition - 1);
    };

    const onCameraStop = () => {
        console.log('Camera has stopped');
        setIsCameraStopped(true);
    };

    const date = new Date(createdAt);
    // 날짜, 월, 연도 추출
    const year = date.getFullYear().toString().slice(-2); // 연도의 마지막 두 자리
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월 (getMonth()는 0부터 시작하므로 1을 더해야 함)
    const day = String(date.getDate()).padStart(2, '0'); // 일
    // 원하는 형식으로 조합
    const formattedDate = `${year}.${month}.${day}`;

    return (
        <>
            <div style={{ position: 'relative', width: '1400px', height: '900px' }}>
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 999, // Higher z-index than canvas
                        pointerEvents: 'auto', // Allow pointer events on the overlay
                    }}
                    onClick={(e) => {
                        // Handle click on overlay (optional)
                        e.preventDefault();
                        // You can add custom handling here if needed
                    }}
                >
                    <button className="relative border border-black p-2 text-sm rounded mt-4" onClick={() => navigate(`/${_id}`)}>Enter Gallery</button>

                    {isCameraStopped && cameraPosition == 0 && (
                        // <h2 className="absolute text-black text-4xl font-bold" style={{ top: '100px', right: '200px' }}>TITLE</h2>
                        <div className="absolute border border-transparent" style={{ top: '100px', right: '130px', width: '300px', height: '700px' }}>
                            <div>
                                <p className="absolute text-black text-3xl font-extrabold" style={{ bottom: '380px', textAlign: 'left' }}>{title}</p>
                                <p className="absolute text-gray-700 text-xl font-medium italic" style={{ bottom: '350px', textAlign: 'left' }}>@{owner.username}, {formattedDate}</p>
                                {/* <p className="absolute text-black text-2xl font-light" style={{ top: '300px' }}>@{owner.username}</p> */}
                            </div>
                            <div>
                                <p className="absolute text-black text-xl font-light" style={{ top: '400px', textAlign: 'left' }}>{post_descript}</p>
                            </div>
                        </div>
                    )}
                </div>
                <Canvas
                    camera={{
                        position: sceneState.camera.position,
                        fov: 75,
                        aspect: winWidth / winHeight
                    }}
                    dpr={window.devicePixelRatio}
                    shadows
                    shadowMap={{
                        type: THREE.PCFSoftShadowMap // 부드러운 그림자 활성화
                    }}
                    onCreated={({ camera }) => camera.lookAt(...sceneState.camera.target)}
                >
                    <Suspense fallback={<Loading />}>
                        <CameraAnimation />
                        <CameraMovementChecker onCameraStop={onCameraStop} />
                        <Lights />
                        <Sky distance={450} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />


                        {/* <ambientLight intensity={1.0} color={0xffffff} /> */}

                        <WhiteWall
                            position={[8, 0, 0]}
                            args={[wallLength, 10, 0.03]} />

                        <MarbleWall position={[8, -5.3, 5]}
                            args={[wallLength, 0.03, 100]} />

                        <PosterFrame
                            position={[-8, 0, 0]}
                            size={{ width: 4, height: 4 }}
                            image_url={title_image}
                        />

                        {images_small.map((image, index) => (
                            <PictureFrame
                                image_url={image}
                                position={[(frameWidth + gapBetweenFrames) * index, 0, 0]}
                                size={{ width: frameWidth, height: 4 }}
                            />
                        ))}
                    </Suspense>
                </Canvas>

            </div>
            {cameraPosition > 0 && (
                <button
                    className="rounded-full border text-white font-bold"
                    onClick={handleLeftClick}
                    style={{
                        position: 'absolute', top: '50%', left: 60,
                        width: 40, height: 40, zIndex: 1000
                    }}>
                    Prev
                </button>
            )}

            {cameraPosition < (numImages) && (
                <button
                    className="rounded-full border text-white font-bold"
                    onClick={handleRightClick}
                    style={{
                        position: 'absolute', top: '50%', right: 60,
                        width: 40, height: 40, zIndex: 1000
                    }}>
                    Next
                </button>
            )}

            {showModal && (
                <SnapshotModal imageUrl={selectedImage} script={selectedScript} onClose={() => setShowModal(false)} />
            )}
        </>
    )
}

export default ShowcaseThreeItem;