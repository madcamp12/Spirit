import React from "react";
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Color } from "three";
import texture from './white_paper.avif';

function WhiteWall(props){
    const WhitePaperTexture = new TextureLoader().load(texture);
    
    return(
        <>
        <mesh position={[props.position[0], props.position[1] - 5, props.position[2]-0.2]} rotation={props.rotation} castShadow>
            <boxGeometry attach="geometry" args={[props.args[0], 0.1, 0.3]}/>
            <meshStandardMaterial attach="material"/>
        </mesh>
        <mesh position={[props.position[0], props.position[1], props.position[2]+0.02]} rotation={props.rotation} receiveShadow>
            <boxGeometry attach="geometry" args={[props.args[0], props.args[1], 0.01]}/>
            <meshStandardMaterial attach="material" color={0xffffff}/>
        </mesh>
        </>
    )
}

export default WhiteWall;