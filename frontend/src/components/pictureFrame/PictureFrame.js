import { useLoader, extend } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { DirectionalLightShadow } from "three";
import { TextureLoader } from 'three/src/loaders/TextureLoader'

function PictureFrame({ image_url, position, size }) {
  const [texture, setTexture] = useState();
  // useEffect(() => {
  //   const loader = new TextureLoader();
  //   loader.load(
  //     image_url,
  //     (loadedTexture) => {
  //       // 텍스처 로드가 완료되면 상태 업데이트
  //       setTexture(loadedTexture);
  //     },
  //     undefined,
  //     (error) => {
  //       console.error('An error happened while loading the texture.', error);
  //     }
  //   );
  // }, [image_url]);

  const picture =new TextureLoader().load(image_url);
  console.log("image_url: ", image_url);
  console.log("picture: ", picture);

  return (
    <group>
      {/* 상단 프레임 */}
      <mesh castShadow receiveShadow position={[position[0], position[1] + size.height / 2, position[2]]} rotation={[0, 0, 0]}>
        <boxGeometry args={[size.width + 0.15, 0.15, 0.4]} />
        <meshStandardMaterial color='black' />
      </mesh>

      {/* 하단 프레임 */}
      <mesh castShadow receiveShadow position={[position[0], position[1] - size.height / 2, position[2]]} rotation={[0, 0, 0]}>
        <boxGeometry args={[size.width + 0.15, 0.15, 0.4]} />
        <meshStandardMaterial color='black' />
      </mesh>

      {/* 좌측 프레임 */}
      <mesh castShadow receiveShadow position={[position[0] - size.width / 2, position[1], position[2]]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.15, size.height, 0.4]} />
        <meshStandardMaterial color='black' />
      </mesh>

      {/* 우측 프레임 */}
      <mesh castShadow receiveShadow position={[position[0] + size.width / 2, position[1], position[2]]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.15, size.height, 0.4]} />
        <meshStandardMaterial color='black' />
      </mesh>

      {/* 사진 */}
      <mesh receiveShadow position={[position[0], position[1], position[2] + 0.05]} rotation={[0, 0, 0]}>
        <planeGeometry args={[size.width - 0.1, size.height - 0.1]} />
        <meshStandardMaterial color='white' />
      </mesh>
      <mesh receiveShadow position={[position[0], position[1], position[2] + 0.1]} rotation={[0, 0, 0]}>
        <boxGeometry args={[size.width - 0.3, size.height - 0.3, 0.03]} />
        <meshStandardMaterial map={picture} />
      </mesh>
    </group>
  );
}

export default PictureFrame;