import React, {useEffect, useRef, useState} from "react";
import { useFrame, useThree } from "@react-three/fiber";

let current_x;

function Camera({
    moveRight,
    moveLeft,
    setMoveRight,
    setMoveLeft
}){

    const { camera, gl } = useThree();
    const cameraRef = useRef(null);
    const speed = 0.05;

    useEffect(() => {
        if(moveRight || moveLeft){
            current_x = camera.position.x;
        }
    }, [moveRight, moveLeft])

    useFrame(() => {
        // console.log("camera.position.x: ", camera.position.x)
        if(moveRight){
            if(camera.position.x <= current_x + 4){
                camera.position.x += speed;
                if(camera.rotation.y != -0.5){
                    camera.rotation.y -= 0.005;
                }
            }else if(camera.position.x < current_x + 8){
                camera.position.x += speed;
                if(camera.rotation.y != 0.0){
                    camera.rotation.y += 0.005;
                }
            }else{
                camera.position.x = parseFloat((camera.position.x).toFixed(0));
                setMoveRight(false);
            }
        }else if(moveLeft){
            if(camera.position.x >= current_x - 4){
                camera.position.x -= speed;
                if(camera.rotation.y != 0.5){
                    camera.rotation.y += 0.005;
                }
            }else if(camera.position.x > current_x - 8){
                camera.position.x -= speed;
                if(camera.rotation.y != 0.0){
                    camera.rotation.y -= 0.005;
                }
            }else{
                camera.position.x = parseFloat((camera.position.x).toFixed(0));
                setMoveLeft(false);
            }
        }

        return null;
    });
    

    return(
        <>
            <orbitControls ref={cameraRef} args={[camera, gl.domElement]}
            enableDamping
            dampingFactor={0.25}
            rotateSpeed={0.5}
            />
        </>   
    )
}

export default Camera;