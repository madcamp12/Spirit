import { useLoader, extend } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { DirectionalLightShadow } from "three";
import { TextureLoader } from 'three/src/loaders/TextureLoader'

function PosterFrame({ image_url, position, size }) {
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

      {/* 사진 */}
      <mesh receiveShadow position={[position[0], position[1], position[2] + 0.05]} rotation={[0, 0, 0]}>
        <planeGeometry args={[size.width - 0.1, size.height - 0.1]} />
        <meshStandardMaterial color='white' />
      </mesh>
      <mesh receiveShadow position={[position[0], position[1], position[2] + 0.1]} rotation={[0, 0, 0]}>
        <boxGeometry args={[size.width - 0.3, size.height - 0.3, 0.05]} />
        <meshStandardMaterial map={picture} />
      </mesh>
    </group>
  );
}

export default PosterFrame;