import React, { useRef, useEffect, useState } from "react";
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { MeshStandardMaterial, Vector3 } from 'three';

export default function SpiritSphere() {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="white" />
      <pointLight color="white" intensity={1} />
    </mesh>
  );
}
