import * as THREE from 'three';
import { proxy } from 'valtio';
import { cameraSet } from './datas';

// sceneState: 시나리오 상태를 정의하는 객체
export const sceneState = proxy({
    lightProgress: 0,
    hoveredFigure: false,
    camera: cameraSet.camera1,
    cameraTargetProgress: new THREE.Vector3(...cameraSet.camera1.target)
});

// loadingState: 로딩 상태를 관리하는 proxy 객체
export const loadingState = proxy({ completed: false });
