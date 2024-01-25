import React, { useMemo } from 'react';
import * as THREE from 'three';

const RectAreaLight = ({
    position,
    rotation,
    width,
    height,
    intensity,
    color
}) => {
    // RectAreaLight 초기화
    const light = useMemo(() => new THREE.RectAreaLight(color, intensity, width, height), [color, intensity, width, height]);

    return (
        <>
            <primitive 
                object={light}
                position={position}
                rotation={rotation}
            />
            {/* 필요한 경우 라이트 헬퍼를 추가할 수 있습니다. */}
            {/* <primitive object={new THREE.RectAreaLightHelper(light)} /> */}
        </>
    );
};

export default RectAreaLight;
