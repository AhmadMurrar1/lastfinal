import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRegThumbsUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

function RentPro() {
    const [userId, setUserId] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            axios.get('https://backendfinal-c767.onrender.com/api/users/user-profile', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(response => setUserId(response.data.id))
            .catch(error => console.error('Error fetching user data:', error));
        }
    }, []);

    const handlePurchase = () => {
        if (!userId) {
            setMessage('User ID not found. Please log in.');
            return;
        }

        axios.post('https://backendfinal-c767.onrender.com/api/users/purchase-rentpro', { userId }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        })
        .then(() => {
            setMessage('RentPro purchased successfully!');
        })
        .catch(error => {
            setMessage('Failed to purchase RentPro: ' + error.response.data);
        });
    };

    const buttonStyles = {
        backgroundColor: '#333',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <img 
                src="https://i.postimg.cc/t4WFkyp9/DALL-E-2024-01-21-10-46-03-Create-a-wide-banner-image-for-Rent-Pro-emphasizing-width-The-banner.png" 
                alt="RentPro" 
                style={{ width: '100%', height: '45vh', objectFit: 'cover' }} 
            />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', padding: '20px', border: '1px solid #ccc' }}>
                <div style={{ width: '45%' }}>
                    <FaRegThumbsUp size={30} style={{ color: '#333' }} />
                    <h2 style={{ color: '#333' }}>Explore Unlimited Gaming</h2>
                    <p style={{ color: '#555' }}>
                        With RentPro, dive into an expansive universe of games...
                    </p>
                </div>

                <div style={{ width: '1px', height: '100%', backgroundColor: '#ccc' }}></div>

                <div style={{ width: '45%' }}>
                    <h2 style={{ color: '#333' }}>One Subscription, Infinite Fun</h2>
                    <p style={{ color: '#555' }}>
                        RentPro isn't just a subscription; it's a gateway to new worlds...
                    </p>
                    <button onClick={handlePurchase} style={buttonStyles}>
                        Buy RentPro for 100 Credits/Cash
                    </button>
                    {message && <p style={{ marginTop: '10px' }}>{message}</p>}
                </div>
            </div>

            <button 
                style={{ width: '10rem', height: '2rem', color: 'white', backgroundColor: '#333', border: 'none', borderRadius: '5px', position: 'absolute', left: '0', margin: '18px' }} 
                onClick={() => navigate('/')}
            >
                Back
            </button>
            <div style={{position:"absolute",bottom:"0px",left:"0"}}><Footer/></div>
        </div>
    );
}

export default RentPro;
