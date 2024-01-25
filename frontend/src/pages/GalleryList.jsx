import React, { useEffect, useRef, useState } from "react";
import PictureFrame from "../components/pictureFrame/PictureFrame";
import MarbleWall from "../components/marbleWall/MarbleWall";
import { Canvas, useThree } from "@react-three/fiber";
import WhiteWall from "../components/whiteWall/WhiteWall";
import Camera from "../components/camera/Camera";

function GalleryList(){
    // check user's width and height
    const [winWidth, setWinWidth] = useState(window.innerWidth);
    const [winHeight, setWinHeight] = useState(window.innerHeight);

    const [moveRight, setMoveRight] = useState(false);
    const [moveLeft, setMoveLeft] = useState(false);

    useEffect(() => {
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

    return(
        <>
        <div style={{position: 'relative', width:'100vw', height:'100vh'}}>

            {/* Canvas: Background Wall, Picture Frames */}
            <Canvas camera={{position: [0, 0, 5], fov: 75, aspect: winWidth / winHeight}}
            style={{position: 'absolute', top: 0, left: 0, maxWidth: '100%', maxHeight: '100%'}}>

                <Camera moveRight={moveRight} moveLeft={moveLeft}
                setMoveLeft={setMoveLeft} setMoveRight={setMoveRight}/>

                <ambientLight intensity={2.0}/>

                <WhiteWall
                position={[0, 0, -0.06]}
                args={[16, 10, 0.03]}/>

                <MarbleWall position={[0, -5, 5]}
                args={[16, 0.03, 10]}/>
                
                <PictureFrame
                // image url은 필요한 url을 받아와서 전달해야 합니다
                image_url='https://cdn-pro-web-208-246.cdn-nhncommerce.com/whitecotton5_godomall_com/data/goods/21/11/44//1000006669/modify_detail_059.jpg'
                position={[0, 0, 0]}
                size = {{width: 4, height: 3}}/>

                <PictureFrame
                // image url은 필요한 url을 받아와서 전달해야 합니다
                image_url='https://blog.dhki.kr/static/img/main/intro-card.jpg'
                position={[8, 0, 0]}
                size = {{width: 4, height: 3}}/>
            </Canvas>
        
            {!moveRight && !moveLeft && (
                <>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>

                </div>
                <button onClick={() => {setMoveLeft(true)}}
                style={{position: 'absolute', top: '50%', left: 40,
                width: 40, height: 40}}>
                    Prev
                </button>
                <button onClick={() => {setMoveRight(true); console.log('pressed button')}}
                style={{position: 'absolute', top: '50%', right: 40,
                width: 40, height: 40}}>
                    Next
                </button>
                </>
            )}
            
        </div>
        </>
    )
}

export default GalleryList;