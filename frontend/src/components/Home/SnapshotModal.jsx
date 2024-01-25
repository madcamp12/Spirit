import { useSpring, animated } from 'react-spring';
import React, { useState, useEffect } from 'react';

export default function SnapshotModal({ imageUrl, script, onClose }) {
    // 'react-spring' 훅을 사용하여 애니메이션 스프링 속성을 정의합니다.
    const springStyle = useSpring({
        from: { transform: 'scale(0.5)', opacity: 0 },
        to: { transform: 'scale(1)', opacity: 1 }
    });

    const [imageLoaded, setImageLoaded] = useState(false);
    useEffect(() => {
        const img = new Image();
        img.onload = () => setImageLoaded(true);
        img.src = imageUrl;
    }, [imageUrl]);

    return (
        <animated.div style={{ ...springStyle, position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
            {/* 모달 콘텐츠 */}
            <div className="bg-black p-4 rounded-xl inline-block" style={{ maxWidth: '900px', maxHeight: '900px' }}>

                {!imageLoaded ? (
                    <>
                        <div style={{ width: '800px', height: '800px', backgroundColor: 'black' }}></div>
                        <p className="text-lg text-white mt-5">Loading...</p>
                    </>
                ) : (
                    <>
                        <img src={imageUrl} alt="Snapshot Original" style={{ maxWidth: '800px', maxHeight: '800px', width: 'auto', height: 'auto' }} className='rounded' />
                        <p className="text-lg text-white mt-5">{script}</p>
                    </>
                )}

            </div>
        </animated.div>
    );
}