import React from 'react';
import { auth } from '../../firebase/config';
import { Button } from 'react-bootstrap';


const LogoutButton: React.FC = () => {
    const handleLogout = async () => {
        try {

            await auth.signOut();
            console.log('User logged out successfully');

        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <Button variant="dark" onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutButton;