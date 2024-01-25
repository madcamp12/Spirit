import * as THREE from 'three';
import React, { useEffect, useRef } from 'react';
import { useSphere } from '@react-three/cannon';
import { useThree, useFrame } from '@react-three/fiber';
import PointerLockControls from '../PointerLockControls/PointerLockControls'
import usePlayerControls from '../usePlayerControls/usePlayerControls'

const Player = (props) => {
  const spiritRef = useRef()
  const { camera } = useThree()
  const {
    forward,
    backward,
    left,
    right,
    jump,
    speed
  } = usePlayerControls()
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 7, 0],
    rotation: [0, 0, 0],
    args: [5], // args를 배열로 수정
    ...props
  }))


  const velocity = 0.015;

  useFrame(() => {
    //copy position of our physical sphere
    camera.position.copy(ref.current.position)

    //set camera position behind sphere

    const frontVector = new THREE.Vector3(0, 0, Number(backward) - Number(forward))
    const sideVector = new THREE.Vector3(Number(left) - Number(right), 0, 0)
    const direction = new THREE.Vector3()
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(speed).applyEuler(camera.rotation)

    if (forward || backward || left || right) {
      ref.current.position.set(ref.current.position.x + direction.x * velocity, ref.current.position.y, ref.current.position.z + direction.z * velocity)
      spiritRef.current.position.set(ref.current.position.x + direction.x * velocity, ref.current.position.y, ref.current.position.z + direction.z * velocity)
    }
  })

  return (
    <>
      <PointerLockControls />
      <mesh ref={spiritRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        {/* 구체의 재질을 설정합니다. */}
        <meshBasicMaterial color="white" />
      </mesh>
    </>
  )

}

export default Player
