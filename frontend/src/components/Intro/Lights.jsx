import { useRef } from 'react';
import { lerp } from 'three/src/math/MathUtils';
import { Cone } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { sceneState } from './modules/store';
import * as THREE from 'three';

// Lights 컴포넌트: 장면의 조명 및 God Rays 효과를 생성
export const Lights = () => {
    const mainLightRef = useRef(null);
    const subLightRef = useRef(null);
    const rayRef = useRef(null);
    

    // Vertex Shader
    const vertexShader = `
        varying vec3 v_eye;
        varying vec3 v_normal;

        void main() {
            vec4 mPos = modelMatrix * vec4(position, 1.0);
            v_eye = normalize(mPos.xyz - cameraPosition);
            v_normal = normal;

            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 0.9 );
        }
    `;

    // Fragment Shader
    const fragmentShader = `
        varying vec3 v_eye;
        varying vec3 v_normal;

        float Fresnel(vec3 eyeVector, vec3 worldNormal) {
            return pow(1.0 + dot(eyeVector, worldNormal), 2.5);
        }

        void main() {
            vec3 color = vec3(1.0, 1.0, 0.5);

            float fresnel = Fresnel(v_eye, normalize(v_normal));
            float a = pow(fresnel * 0.1, 1.2);
            color *= fresnel;

            gl_FragColor = vec4(color, a);
        }
    `;

    const shader = {
        uniforms: {},
        vertexShader,
        fragmentShader
    };

    let lightProgress = sceneState.lightProgress;
    useFrame(() => {
        lightProgress = lerp(lightProgress, sceneState.lightProgress, 0.1);

        mainLightRef.current.angle = (Math.PI / 12) * lightProgress;
        subLightRef.current.intensity = 2 * Math.pow(lightProgress, 3);
        rayRef.current.scale.set(lightProgress, 1, lightProgress);
    });

    return (
        <group position-z={5}>
            <spotLight
                ref={mainLightRef}
                intensity={10}
                color="#fefdb2"
                position={[0, 5, 0]}
                angle={Math.PI / 12}
                distance={10}
                penumbra={0.8}
                decay={3.5}
                castShadow
                shadow-mapSize={[1024, 1024]}
            />
            <spotLight
                ref={subLightRef}
                intensity={2}
                position={[0, 5, -4]}
                angle={Math.PI / 12}
                distance={10}
                penumbra={0.8}
                decay={3.5}
            />
            {/* AmbientLight 추가 */}
            <ambientLight intensity={1.0} />

            {/* DirectionalLight 추가 */}
            <directionalLight position={[-8, 20, 8]} intensity={1.0} />

            <Cone ref={rayRef} position={[0, 2, -3]} rotation-x={Math.PI / 4} args={[2.6, 15, 256, 1, true]}>
                <shaderMaterial args={[shader]} transparent />
            </Cone>
        </group>
    );
};
