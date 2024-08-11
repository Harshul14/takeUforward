import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import Dashboard from './Dashboard';
import './styles.css';

function App() {
    const [bannerState, setBannerState] = useState({
        description: '',
        timer: 0,
        link: '',
        isVisible: false,
    });

    useEffect(() => {
        fetch('http://localhost:5000/banner')
            .then((response) => response.json())
            .then((data) => {
                setBannerState({
                    description: data.description,
                    timer: data.timer,
                    link: data.link,
                    isVisible: data.is_visible === 1,
                });
            })
            .catch((error) => console.error('Error:', error));
    }, []);

    const updateBanner = (newBannerState) => {
        setBannerState({
            ...newBannerState,
            isVisible: newBannerState.is_visible === 1,
        });
    };

    const handleTimerEnd = () => {
        setBannerState((prevState) => ({
            ...prevState,
            isVisible: false,
        }));
    };

    return (
        <div className="App">
            <Banner
                description={bannerState.description}
                link={bannerState.link}
                isVisible={bannerState.isVisible}
                timer={bannerState.timer}
                onTimerEnd={handleTimerEnd}
            />
            <Dashboard onUpdateBanner={updateBanner} />
        </div>
    );
}

export default App;