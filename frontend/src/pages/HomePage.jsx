import React from 'react';
import ImageStack from '../components/ImageStack';
import { Hero } from '../components/Hero';
import { Collage } from '../components/Collage';

export const Homepage = () => {
    return (
        <div className="snap-y snap-mandatory h-screen overflow-y-scroll bg-[#0A0B06] select-none">
            <div className="snap-center h-screen flex items-center justify-center">
                <ImageStack />
            </div>
            <div className="snap-center h-screen flex items-center justify-center">
                <Hero />
            </div>
            <div className="snap-center h-screen flex items-center justify-center">
                <Collage />
            </div>
        </div>
    );
};