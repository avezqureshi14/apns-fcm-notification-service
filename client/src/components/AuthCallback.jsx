import React, { useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
    const history = useNavigate();

    useEffect(() => {
        const handleAuthCallback = async () => {
            const { data, error } = await supabase.auth.getSessionFromUrl({ storeSession: true });

            if (error) {
                console.error('Error handling auth callback:', error.message);
            } else {
                history.push('/');
            }
        };

        handleAuthCallback();
    }, [history]);

    return <div>Loading...</div>;
};

export default AuthCallback;
