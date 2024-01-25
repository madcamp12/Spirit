import React from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { sceneState } from './store';

// CameraAnimation 컴포넌트: 카메라 애니메이션을 처리
export const CameraAnimation = () => {
	const target = new THREE.Vector3();

	return useFrame(({ camera }) => {
		// console.log(sceneState.camera.position[0], sceneState.camera.position[1], sceneState.camera.position[2]);
		target.set(...sceneState.camera.position);
		camera.position.lerp(target, 0.02);

		target.set(...sceneState.camera.target);
		sceneState.cameraTargetProgress.lerp(target, 0.05);
		camera.lookAt(sceneState.cameraTargetProgress);
	});
};
