import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../../api';
import { useState, useEffect, use } from 'react';

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(()=>setIsAuthorized(false));
    },[])
        

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem('REFRESH_TOKEN_KEY');
        try {
            const response = await api.post('/api/token/refresh/', {
                refresh: refreshToken,
            });
            if (response.status === 200) {
                localStorage.setItem('ACCESS_TOKEN_KEY', response.data.access);
                setIsAuthorized(true);
                return;
            }
            setIsAuthorized(false);
        } catch (error) {
            setIsAuthorized(false);
            return;
        }
    }

    const auth = async () => {
        const token = localStorage.getItem('ACCESS_TOKEN_KEY');
        if (!token) {
            setIsAuthorized(false);
            return;
        }

        const decodedToken = jwtDecode(token);
        const tokenExpiration = decodedToken.exp;
        const currentTime = Date.now() / 1000;

        if (tokenExpiration < currentTime) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    }

    if (isAuthorized === null) {
        auth();
        return <>Loading</>; // or a loading spinner
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}

export { ProtectedRoute };