import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the structure of the context
interface User {
    isLoggedIn: boolean;
    email: string;
    couponCode: string;
}

interface UserContextType {
    user: User;
    login: (userData: { email: string; coupon_code: string }) => void;
    logout: () => void;
}

// Create the context with the correct type, and give it a default value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a type for the props of UserProvider
interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User>({
        isLoggedIn: false,
        email: '',
        couponCode: '',
    });

    const login = (userData: { email: string; coupon_code: string }) => {
        setUser({
            isLoggedIn: true,
            email: userData.email,
            couponCode: userData.coupon_code,
        });
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser({
            isLoggedIn: false,
            email: '',
            couponCode: '',
        });
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use UserContext
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
