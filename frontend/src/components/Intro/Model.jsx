import React, { useRef, useState } from 'react';
import { Sparkles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { sceneState } from './modules/store';
import { cameraSet } from './modules/datas';
import { BufferAttribute } from 'three';


export const Model = () => {
    const group = useRef(null);
    const sparklesRef = useRef(null);

    useFrame(() => {
        const attrOpacity = sparklesRef.current.geometry.getAttribute('opacity');
        const opacity = Array(attrOpacity.count).fill(sceneState.lightProgress);
        sparklesRef.current.geometry.setAttribute('opacity', new BufferAttribute(Float32Array.from(opacity), 1));
    });

    const handleClick = () => {
        sceneState.camera = sceneState.camera.name === 'ORIGINAL' ? cameraSet.camera2 : cameraSet.camera1;
        sceneState.hoveredFigure = false;
    };

    const handlePointerEnter = () => {
        sceneState.hoveredFigure = true;
    };

    const handlePointerLeave = () => {
        sceneState.hoveredFigure = false;
    };

    return (
        <group ref={group} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                onClick={handleClick}
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
                position={[0, 1, 0.7]}
            >
                <sphereGeometry args={[1.1, 50, 50]} />
                <meshBasicMaterial color="skyblue" transparent opacity={0} />
            </mesh>
            <Sparkles
                ref={sparklesRef}
                position={[-0.3, 0.7, 0.5]}
                count={50}
                scale={[4, 1, 4]}
                size={5}
                speed={0.5} />
        </group>
    );
};