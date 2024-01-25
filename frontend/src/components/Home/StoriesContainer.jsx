import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { Cookies } from "react-cookie";
// import { stories } from "./DummyStories";
import "./HomeComponents.css";
import { useState, useEffect } from "react";

const StoriesContainer = () => {

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 3,
    };
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
    const [stories, setStories] = useState([]);
    const getStories = async () => {
        const cookies = new Cookies();
        const req = {
            token: cookies.get('token')
        }

        const {data} = await axios.post('https://madcamp.dhki.kr/posts/stories', req);
        setStories([...stories, ...data.stories]);
    }
    useEffect(() => {
        getStories();
    }, [])


    const handleStoryClick = (index) => {
        setSelectedStoryIndex(index);
        setIsModalOpen(true);
    };
    const goToNextStory = () => {
        if (selectedStoryIndex < stories.length - 1) {
            setSelectedStoryIndex(selectedStoryIndex + 1);
        } else {
            setIsModalOpen(false);
        }
    };

    const goToPreviousStory = () => {
        if (selectedStoryIndex > 0) {
            setSelectedStoryIndex(selectedStoryIndex - 1);
        } else {
            setIsModalOpen(false);
        }
    };

    const ProgressBar = ({ duration, onComplete }) => {
        const [progress, setProgress] = useState(0);

        useEffect(() => {
            const interval = setInterval(() => {
                setProgress(oldProgress => {
                    if (oldProgress === 100) {
                        clearInterval(interval);
                        onComplete();
                        return 100;
                    }
                    return Math.min(oldProgress + 3 / (duration / 1000), 100);
                });
            }, 1000 / (duration / 100));

            return () => clearInterval(interval);
        }, [duration, onComplete]);

        return <div className="mb-2" style={{ width: `${progress}%`, backgroundColor: 'white', height: '3px' }} />;
    };

    const StoryModal = ({ story, onClose, onNext, onPrevious, isFirstChild, isLastChild }) => {
        const handleModalOutsideClick = (e) => {
            if (e.target === e.currentTarget) {
                onClose();
            }
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 story-modal" onClick={handleModalOutsideClick}>

                <div className="p-4 rounded" style={{ width: '620px', height: '650px' }}>
                    <ProgressBar duration={5000} onComplete={onNext} />
                    <img src={story.poster} alt={story.title} style={{ width: '600px', height: '600px' }} />
                    <p className="text-lg text-white mt-2">@{story.owner.username}</p>
                </div>
                {!isFirstChild && (
                    <button
                        className="rounded-full border text-white font-bold"
                        onClick={onPrevious}
                        style={{
                            position: 'absolute', top: '48%', left: 500,
                            width: 40, height: 40, zIndex: 1000
                        }}>
                        Prev
                    </button>
                )}
                {!isLastChild && (
                    <button
                        className="rounded-full border text-white font-bold"
                        onClick={onNext}
                        style={{
                            position: 'absolute', top: '48%', right: 500,
                            width: 40, height: 40, zIndex: 1000
                        }}>
                        Next
                    </button>
                )}
                <div className="absolute top-0 right-0 p-6">
                    <button onClick={onClose} className="text-white font-bold text-sm">Close</button>
                </div>
            </div>
        );
    };



    return (
        // <>
        //     <Slider {...settings} className="w-full bg-white pt-2.5 pb-1 px-2.5 flex overflow-hidden">
        //         {stories.map((s, i) => (
        //             <div onClick={() => handleStoryClick(i)} key={i} className="cursor-pointer">
        //                 {/* Story Thumbnail */}
        //             </div>
        //         ))}
        //     </Slider>
        //     {isModalOpen && (
        //         <StoryModal
        //             story={stories[selectedStoryIndex]}
        //             onClose={() => setIsModalOpen(false)}
        //             onNext={goToNextStory}
        //             onPrevious={goToPreviousStory}
        //         />
        //     )}
        // </>
        <>
            <Slider {...settings} className="w-full bg-white pt-2.5 pb-1 px-2.5 flex overflow-hidden" style={{ zIndex: 1 }}>

                {stories.map((s, i) => (
                    <div className="flex flex-col text-center justify-center items-center p-2 cursor-pointer" onClick={() => handleStoryClick(i)} key={i}>
                        <div className="ml-1 mb-1 w-16 p-[1px] h-16 rounded-full border-2 border-red-500">
                            <img loading="lazy" className="rounded-full h-full w-full border border-gray-300 object-cover" src={s.poster} draggable="false" alt="story" />
                        </div>
                        <span className="text-xs ellipsis">{s.owner.username}</span>
                    </div>
                ))}

            </Slider>
            {isModalOpen && (
                <StoryModal
                    story={stories[selectedStoryIndex]}
                    onClose={() => setIsModalOpen(false)}
                    onNext={goToNextStory}
                    onPrevious={goToPreviousStory}
                    isFirstChild={selectedStoryIndex === 0}
                    isLastChild={selectedStoryIndex === stories.length - 1}
                />
            )}
        </>
    );
}

export default StoriesContainer