// import React, { useRef } from 'react';
// import { PerspectiveCamera } from 'three';

// const Camera = (props) => {
//     const cameraRef = useRef(new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));

//     // 창 크기 변경에 대응하여 카메라 비율을 업데이트합니다.
//     window.addEventListener('resize', () => {
//         cameraRef.current.aspect = window.innerWidth / window.innerHeight;
//         cameraRef.current.updateProjectionMatrix();
//     });

//     return cameraRef.current; // 카메라 객체 반환
// };

// export default Camera;

import React, { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';

const Camera = (props) => {
    const ref = useRef();
    // const { setDefaultCamera } = useThree();
    const set = useThree(({ set }) => set)
    const size = useThree(({ size }) => size)
    
    useEffect(() => {
        if (ref.current) {
            ref.current.aspect = size.width / size.height
            ref.current.updateProjectionMatrix()
        }
    }, [size, props])

    useEffect(() => {
        set({ camera: ref.current })
    }, [])

    return (
        <perspectiveCamera ref={ref} {...props} />
    )
}

export default Camera;