import React from 'react';
import SpotLight from '../SpotLight/Spotlight';
import PointLight from '../PointLight/PointLight';
import DirectionalLight from '../DirectionalLight/DirectionalLight';
import Spotlight from '../SpotLight/Spotlight';
import RectAreaLight from '../RectAreaLight/RectAreaLight';

const Lights = ({ night, performance }) => {

    return (
        <>
            <ambientLight intensity={night ? 0.05 : 0.8} />
            {/* moon/sunlight */}
            <DirectionalLight
                position={[29, 50, -60]}
                target={[-5, -3, 50]}
                intensity={night ? 0.2 : 0.3}
                color={"white"}
                shadowCamBot={-30}
                shadowCamTop={30}
                shadowCamL={53}
                shadowCamR={-53}
            />
            {/* moon light */}
            {night ? <Spotlight
                position={[0, 80, -120]}
                target={[80, 150, -200]}
                intensity={0.5}
                penumbra={0.5}
                sNormalBias={0}
                sBias={0}
                angle={-Math.PI}
                decay={2}
            /> : null}

            <PointLight
                intensity={performance ? 0.25 : 60}
                position={[0, 10, 13]}
            />
            <RectAreaLight
                position={[34.5, 10, 0]}
                rotation={[Math.PI, -Math.PI / 2, Math.PI / 2]}
                intensity={0.5}
                width={13}
                height={13}
            />
            <RectAreaLight
                position={[34.5, 10, 24]}
                rotation={[Math.PI, -Math.PI / 2, Math.PI / 2]}
                intensity={0.5}
                width={13}
                height={13}
            />
            <RectAreaLight
                position={[24, 10, 40.3]}
                rotation={[Math.PI, 0, Math.PI / 2]}
                intensity={0.5}
                width={9}
                height={9}
            />
            <RectAreaLight
                position={[8, 10, 40.3]}
                rotation={[Math.PI, 0, Math.PI / 2]}
                intensity={0.5}
                width={9}
                height={9}
            />
            <RectAreaLight
                position={[-8, 10, 40.3]}
                rotation={[Math.PI, 0, Math.PI / 2]}
                intensity={0.5}
                width={9}
                height={9}
            />
            <RectAreaLight
                position={[-24, 10, 40.3]}
                rotation={[Math.PI, 0, Math.PI / 2]}
                intensity={0.5}
                width={9}
                height={9}
            />
            <RectAreaLight
                position={[-34.5, 10, 24]}
                rotation={[Math.PI, Math.PI / 2, Math.PI / 2]}
                intensity={0.5}
                width={13}
                height={13}
            />
            <RectAreaLight
                position={[-34.5, 10, 0]}
                rotation={[Math.PI, Math.PI / 2, Math.PI / 2]}
                intensity={0.5}
                width={13}
                height={13}
            />

            {performance ?
                <>
                    <SpotLight
                        position={[26, 25, 0]}
                        target={[34.5, 14, 0]}
                        intensity={100}
                        penumbra={0.5}
                        sNormalBias={0.05}
                        sBias={0}
                        angle={Math.PI / 4}
                        decay={2}
                    />
                    <SpotLight
                        position={[26, 25, 24]}
                        target={[34.5, 14, 24]}
                        intensity={100}
                        penumbra={0.5}
                        sNormalBias={0.05}
                        sBias={0}
                        angle={Math.PI / 4}
                        decay={2}
                    />

                    <SpotLight
                        position={[24, 20, 30]}
                        target={[24, 10, 40]}
                        intensity={100}
                        penumbra={0.5}
                        sNormalBias={0.05}
                        sBias={0}
                        angle={Math.PI / 5}
                        decay={2}
                    />
                    <SpotLight
                        position={[8, 20, 30]}
                        target={[8, 10, 40]}
                        intensity={100}
                        penumbra={0.5}
                        sNormalBias={0.05}
                        sBias={0}
                        angle={Math.PI / 5}
                        decay={2}
                    />
                    <SpotLight
                        position={[-8, 20, 30]}
                        target={[-8, 10, 40]}
                        intensity={100}
                        penumbra={0.5}
                        sNormalBias={0.05}
                        sBias={0}
                        angle={Math.PI / 5}
                        decay={2}
                    />
                    <SpotLight
                        position={[-24, 20, 30]}
                        target={[-24, 10, 40]}
                        intensity={100}
                        penumbra={0.5}
                        sNormalBias={0.05}
                        sBias={0}
                        angle={Math.PI / 5}
                        decay={2}
                    />

                    <SpotLight
                        position={[-26, 25, 24]}
                        target={[-34.5, 14, 24]}
                        intensity={100}
                        penumbra={0.5}
                        sNormalBias={0.05}
                        sBias={0}
                        angle={Math.PI / 4}
                        decay={2}
                    />
                    <SpotLight
                        position={[-26, 25, 0]}
                        target={[-34.5, 14, 0]}
                        intensity={100}
                        penumbra={0.5}
                        sNormalBias={0.05}
                        sBias={0}
                        angle={Math.PI / 4}
                        decay={2}
                    />
                </>
                :
                null
            }

        </>
    )

}

export default Lights;