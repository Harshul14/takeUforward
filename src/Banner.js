import React, { useState, useEffect } from 'react';

const Banner = ({ description, link, isVisible, timer, onTimerEnd }) => {
    const [timeLeft, setTimeLeft] = useState(timer);

    useEffect(() => {
        setTimeLeft(timer);
    }, [timer, isVisible]);

    useEffect(() => {
        if (isVisible && timeLeft > 0) {
            const countdown = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(countdown);
        } else if (timeLeft === 0) {
            onTimerEnd();
        }
    }, [isVisible, timeLeft, onTimerEnd]);

    if (!isVisible) return null;

    return (
        <div className="banner">
            <p>{description}</p>
            {link && (
                <a href={link} target="_blank" rel="noopener noreferrer">
                    Visit Link
                </a>
            )}
            <p>Time left: {timeLeft} seconds</p>
        </div>
    );
};

export default Banner;
