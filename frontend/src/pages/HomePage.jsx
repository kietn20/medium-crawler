import React from 'react';
import ImageStack from '../components/ImageStack';
import { Hero } from '../components/Hero';

export const Homepage = () => {
    return (
        <div className="snap-y snap-mandatory h-screen overflow-y-scroll bg-[#0A0B06]">
            <div className="snap-start h-screen flex items-center justify-center">
                <ImageStack />
            </div>
            <div className="snap-start h-screen flex items-center justify-center">
                <Hero />
            </div>
        </div>
    );
};