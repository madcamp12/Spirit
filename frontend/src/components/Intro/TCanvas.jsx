import React, { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Lights } from './Lights';
import { Loading } from './Loading';
import { SwayingGrass } from './SwayingGrass';
import { sceneState } from './modules/store';
import { CameraAnimation } from './CameraAnimation';
import { Model } from './Model';

// TCanvas 컴포넌트: @react-three/fiber의 Canvas를 활용한 3D 씬 렌더링
export const TCanvas = () => {
	return (
		<Canvas
			camera={{
				position: sceneState.camera.position,
				fov: 50,
				aspect: window.innerWidth / window.innerHeight,
				near: 0.01,
				far: 1000
			}}
			dpr={window.devicePixelRatio}
			shadows
			onCreated={({ camera }) => camera.lookAt(...sceneState.camera.target)}
		>
			<color attach="background" args={['#000']} />
			<Suspense fallback={<Loading />}>
				<Lights />
				<Model />
				<SwayingGrass />
				<CameraAnimation />
			</Suspense>
		</Canvas>
	)
}
