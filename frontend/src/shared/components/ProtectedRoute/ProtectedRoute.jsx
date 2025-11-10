import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { api } from '@shared/api';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@shared/constants/authConstants';

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth();
    }, []);

    const refreshToken = async () => {
        const refresh = localStorage.getItem(REFRESH_TOKEN_KEY);
        try {
            const response = await api.post('/token/refresh/', {
                refresh: refresh,
            });
            localStorage.setItem(ACCESS_TOKEN_KEY, response.data.access);
            setIsAuthorized(true);
        } catch (error) {
            console.error('Token refresh failed:', error);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN_KEY);
        if (!token) {
            setIsAuthorized(false);
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            const tokenExpiration = decodedToken.exp;
            const currentTime = Date.now() / 1000;

            if (tokenExpiration < currentTime) {
                await refreshToken();
            } else {
                setIsAuthorized(true);
            }
        } catch (error) {
            console.error('Token decode failed:', error);
            setIsAuthorized(false);
        }
    };

    if (isAuthorized === null) {
        return <>Loading...</>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}

export { ProtectedRoute };