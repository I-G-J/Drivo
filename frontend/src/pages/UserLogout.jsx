import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/users/logout`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                
                if (response.status === 200) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } catch (error) {
                console.error('Logout failed:', error);
                // Remove token anyway on error
                localStorage.removeItem('token');
                navigate('/login');
            }
        };

        handleLogout();
    }, [token, navigate]);

    return (
        <div className="flex items-center justify-center h-screen">
            <h1>Logging out...</h1>
        </div>
    )
}

export default UserLogout