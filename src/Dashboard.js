import React, { useState } from 'react';

const Dashboard = ({ onUpdateBanner }) => {
    const [description, setDescription] = useState('');
    const [timer, setTimer] = useState(10);
    const [link, setLink] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const handleSubmit = () => {
        const updatedBanner = {
            description,
            timer,
            link,
            is_visible: isVisible ? 1 : 0,
        };

        fetch('http://localhost:5000/banner', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBanner),
        })
            .then((response) => response.text())
            .then((data) => {
                console.log(data);
                onUpdateBanner(updatedBanner);
            })
            .catch((error) => console.error('Error:', error));
    };

    return (
        <div className="dashboard">
            <h2>Banner Dashboard</h2>
            <div>
                <label>Description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label>Timer (in seconds):</label>
                <input
                    type="number"
                    value={timer}
                    onChange={(e) => setTimer(e.target.value)}
                />
            </div>
            <div>
                <label>Link:</label>
                <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
            </div>
            <div>
                <label>Visible:</label>
                <input
                    type="checkbox"
                    checked={isVisible}
                    onChange={() => setIsVisible(!isVisible)}
                />
            </div>
            <button onClick={handleSubmit}>Update Banner</button>
        </div>
    );
};

export default Dashboard;