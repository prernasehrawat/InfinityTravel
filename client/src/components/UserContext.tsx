import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the structure of the context
interface User {
  isLoggedIn: boolean;
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  couponCode: string;
  profileImage?: string;
}

interface UserContextType {
  user: User;
  login: (userData: Omit<User, "isLoggedIn">) => void;
  logout: () => void;
  updateUser: (updatedData: Partial<User>) => void;
}

// Create the context with the correct type, and give it a default value
const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : {
          isLoggedIn: false,
          user_id: "",
          email: "",
          first_name: "",
          last_name: "",
          phone_number: "",
          couponCode: "",
          profileImage: "", // Set default empty profile image
        };
  });

  const login = (userData: Omit<User, "isLoggedIn">) => {
    const updatedUser = { ...userData, isLoggedIn: true };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const logout = () => {
    setUser({
      isLoggedIn: false,
      user_id: "",
      email: "",
      first_name: "",
      last_name: "",
      phone_number: "",
      couponCode: "",
      profileImage: "", // Reset profile image on logout
    });
    localStorage.removeItem("user");
  };

  const updateUser = (updatedData: Partial<User>) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser)); // Save to localStorage
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
