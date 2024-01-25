import React, { useEffect, useState } from 'react';
import Picture from '../Picture/Picture';
import Display from '../Display/Display';

const Art = (galleryData) => {
    // console.log("galleryData: ", galleryData);
    const galleryDataLoaded = galleryData?.galleryData;
    // console.log("galleryDataLoaded: ", galleryDataLoaded);
    const numImages = galleryDataLoaded?.images_small.length;
    console.log("galleryData.images_small: ", galleryDataLoaded?.images_small);

    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        const newImageUrls = [];
        if (galleryData && galleryDataLoaded) {
            for (let i = 0; i < 8; i++) {
                if (i === 0) {
                    newImageUrls.push(galleryDataLoaded?.title_image_small);
                } else {
                    newImageUrls.push(galleryDataLoaded?.images_small[i - 1] || '/default_canvas.jpg');
                }
            }
        }
        setImageUrls(newImageUrls);
    }, [galleryData]);

    return (
        <>
            <Picture
                url={"assets/3D/Image1/scene.gltf"}
                image={imageUrls[0]}
                scale={[6, 6, 6]}
                position={[34.5, 10, 0]}
                rotation={[-Math.PI / 2, 0, Math.PI]}
                metalness={0}
                roughness={0.9}
            />

            <Picture
                url={"assets/3D/Image2/scene.gltf"}
                image={imageUrls[1]}
                scale={[6, 6, 6]}
                position={[34.5, 10, 24]}
                rotation={[-Math.PI / 2, 0, Math.PI]}
                metalness={0}
                roughness={0.9}
            />

            <Picture
                url={"assets/3D/Image3/scene.gltf"}
                image={imageUrls[2]}
                scale={[4, 4, 4]}
                position={[24, 10, 40.2]}
                rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                metalness={0}
                roughness={0.9}
            />
            <Picture
                url={"assets/3D/Image4/scene.gltf"}
                image={imageUrls[3]}
                scale={[4, 4, 4]}
                position={[8, 10, 40.2]}
                rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                metalness={0}
                roughness={0.9}
            />
            <Picture
                url={"assets/3D/Image5/scene.gltf"}
                image={imageUrls[4]}
                scale={[4, 4, 4]}
                position={[-8, 10, 40.2]}
                rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                metalness={0}
                roughness={0.9}
            />
            <Picture
                url={"assets/3D/Image6/scene.gltf"}
                image={imageUrls[5]}
                scale={[4, 4, 4]}
                position={[-24, 10, 40.2]}
                rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                metalness={0}
                roughness={0.9}
            />

            <Picture
                url={"assets/3D/Image7/scene.gltf"}
                image={imageUrls[6]}
                scale={[6, 6, 6]}
                position={[-34.5, 10, 24]}
                rotation={[-Math.PI / 2, 0, 0]}
                metalness={0}
                roughness={0.9}
            />

            <Picture
                url={"assets/3D/Image8/scene.gltf"}
                image={imageUrls[7]}
                scale={[6, 6, 6]}
                position={[-34.5, 10, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                metalness={0}
                roughness={0.9}
            />
        </>

    )
}

export default Art;