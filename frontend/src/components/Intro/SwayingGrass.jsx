import { useCallback, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler';
import { lerp } from 'three/src/math/MathUtils';
import { useFrame } from '@react-three/fiber';
import { sceneState } from './modules/store';

// SwayingGrass 컴포넌트: 흔들리는 잔디 효과를 위한 인스턴스 메쉬 생성
export const SwayingGrass = () => {
	const meshRef = useRef(null);

	// 지오메트리 샘플링
	const samplingGeometry = useMemo(() => {
		const geometry = new THREE.PlaneGeometry(10, 10).toNonIndexed();
		geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
		return geometry;
	}, []);

	// 샘플러 생성
	const sampler = useMemo(() => {
		const samplingMesh = new THREE.Mesh(samplingGeometry, new THREE.MeshBasicMaterial());
		const sampler = new MeshSurfaceSampler(samplingMesh).build();
		return sampler;
	}, [samplingGeometry]);

	// 매트릭스 초기화
	const amount = 20000; // 20,000 인스턴스
	const updateMatrix = useCallback(() => {
		const object = new THREE.Object3D();
		const samplingPosition = new THREE.Vector3();
		const samplingNormal = new THREE.Vector3();
		const getScale = () => [0.6, 0.6, 0.3 + Math.random() * 0.3];

		for (let i = 0; i < amount; i++) {
			sampler.sample(samplingPosition, samplingNormal);
			object.position.copy(samplingPosition);
			object.lookAt(samplingNormal.add(samplingPosition));
			object.scale.set(...getScale());
			object.updateMatrix();

			meshRef.current.setMatrixAt(i, object.matrix);
		}
		meshRef.current.instanceMatrix.needsUpdate = true;
	}, [amount, sampler]);

	useEffect(() => {
		meshRef.current.geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI / 2));
		meshRef.current.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 0, 0.5));

		updateMatrix();
	}, [updateMatrix]);

    // Vertex Shader
    const vertexShader = `
		uniform float u_time;
		uniform float u_sway;
		varying float v_pz;
		varying vec3 v_gPos;

		const float PI = 3.14159265358979;

        void main() {
            vec3 pos = position.xyz;
            v_pz = pos.z;

            vec3 base = vec3(pos.x, pos.y, 0.0);
            vec4 baseGP = instanceMatrix * vec4(base, 1.0);

            float swingX = sin(u_time * 2.0) * pow(v_pz, 2.0);
            float swingY = cos(u_time * 2.0) * pow(v_pz, 2.0);
            pos.x += swingX * u_sway;
            pos.y += swingY * u_sway;

            vec4 globalPosition = instanceMatrix * vec4(pos, 1.0);
            vec4 mPos = modelMatrix * globalPosition;
            v_gPos = globalPosition.xyz;

            gl_Position = projectionMatrix * viewMatrix * mPos;
        }

		
    `;

    // Fragment Shader
    const fragmentShader = `
        uniform float u_lightProgress;

        varying float v_pz;
        varying vec3 v_gPos;

        void main() {
            vec3 color = mix(vec3(0.0), vec3(0.68, 0.89, 0.40), v_pz);

            vec2 p = v_gPos.xz;
            p.y *= 0.8;
            float len = length(p);
            float dark = 1.0 - smoothstep(0.0, 2.5 * u_lightProgress, len);
            color *= dark;

            gl_FragColor = vec4(color, 1.0);
        }
    `;
	const shader = {
		uniforms: {
			u_time: { value: 0 },
			u_sway: { value: 0.2 },
			u_lightProgress: { value: sceneState.lightProgress }
		},
		vertexShader,
		fragmentShader
	};

	let lightProgress = sceneState.lightProgress;
	useFrame(() => {
		lightProgress = lerp(lightProgress, sceneState.lightProgress, 0.1);

		shader.uniforms.u_time.value += 0.005;
		shader.uniforms.u_lightProgress.value = lightProgress;
	});

	return (
		<group>
			<mesh geometry={samplingGeometry}>
				<meshBasicMaterial color="#000" />
			</mesh>
			<instancedMesh ref={meshRef} args={[undefined, undefined, amount]}>
				<coneGeometry args={[0.05, 1.0, 2, 20, false, 0, Math.PI]} />
				<shaderMaterial args={[shader]} side={THREE.DoubleSide} />
			</instancedMesh>
		</group>
	);
};
