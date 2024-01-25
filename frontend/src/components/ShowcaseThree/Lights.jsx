import { useRef, useEffect } from 'react';
import { lerp } from 'three/src/math/MathUtils';
import { Cone } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import DirectionalLight from './DirectionalLight';

// Lights 컴포넌트: 장면의 조명 및 God Rays 효과를 생성
export const Lights = () => {

    return (
        <>
            <directionalLight
                castShadow
                position={[0, 20, 10]}
                intensity={4}
                shadow-mapSize-width={4096}
                shadow-mapSize-height={4096}
                shadow-camera-left={-100}
                shadow-camera-right={100}
                shadow-camera-top={100}
                shadow-camera-bottom={-100}
                shadow-camera-near={1}
                shadow-camera-far={500}
                bias={0.0001}
            />
           
            <ambientLight intensity={0.3} />
        </>
    );
};
