import React, { useEffect, useState } from "react";
import img1 from '../../assets/l1.jpg';
import img2 from '../../assets/l2.jpg';
import img3 from '../../assets/l3.jpg';
import img4 from '../../assets/l4.jpg';
import './Home.css';
import PopularClasses from "./PopularClasses";
import PopularInstructors from "./PopularInstructors";

const Home = () => {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };
    useEffect(() => {
        document.body.className = theme;
    }, [theme]);
    return (
        <div>
            {/* Slider */}
            <div className="carousel w-full mb-7">
                <div id="slide1" className="carousel-item relative w-full">
                    <div className="placeText mx-auto">
                        <img src={img1} className="w-full" style={{ width: "1920px", height: "650px" }} />
                        <p className="text-white text-3xl font-serif font-semibold text-center absolute top-96 left-28">Communicate with everyone with their native language & increase your community</p>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide4" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <div className="placeText mx-auto">
                        <img src={img2} className="w-full" style={{ width: "1920px", height: "650px" }} />
                        <p className="text-black text-3xl font-serif font-semibold text-center absolute top-96 left-28">Enrich your language knowledge with diversities and explore the world freely</p>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <div className="placeText mx-auto">
                        <img src={img3} className="w-full" style={{ width: "1920px", height: "650px" }} />
                        <p className="text-white text-3xl font-serif font-semibold text-center absolute top-96 left-28">To get close to a specific community, speaking their language is the easiest way</p>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide4" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide4" className="carousel-item relative w-full">
                    <div className="placeText mx-auto">
                        <img src={img4} className="w-full" style={{ width: "1920px", height: "650px" }} />
                        <p className="text-black text-3xl font-serif font-semibold text-center absolute top-96 left-28">This is the best place where you'll be introduced to different languages to learn</p>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>
            <PopularClasses></PopularClasses>
            <PopularInstructors></PopularInstructors>
            <h2 className="font-serif font-bold text-black text-3xl text-center my-8">About Us</h2>
            <div className="container mx-auto p-4 my-8 border-solid border-2 rounded-lg border-orange-200">
                <p className="font-serif font-semibold text-center">Learning a second language is essential in today’s global marketplace. If you plan on making a career in any area of the international sector—be it in business, education, policy, hospitality, or any other avenue—being a multilinguist is a fundamental skill you need to acquire. Not only will it qualify you for a position, it will also drastically improve the quality of your work and the enjoyment you take in everyday communication.</p>
                <p className="font-serif font-semibold text-center">So, from 2016 we've started our journey to give a platform where people can learn multi-languages to enrich their knowledge and to increase or spread their community in the worldwide. We've the most talented, eligible and high quality instructors for each language class. For that, we can assure the quality of the content that you'll be taught with! LanguageShala is the most trusted learning platform that can be trusted fully by people from any country.</p>
            </div>
            <div className="container mx-auto my-8">
                <button className="btn bg-orange-400 hover:bg-orange-700 font-serif font-semibold" onClick={toggleTheme}>Change Theme</button>
            </div>
        </div>
    );
}
export default Home;