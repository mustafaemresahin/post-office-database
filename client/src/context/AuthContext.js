import { createContext, useState, useEffect } from 'react';

// Create Our Context
export const AuthContext = createContext();

// Local Storage Functions
const getAuthenticatedId = () => {
    const authenticatedId = localStorage.getItem("id");
    return authenticatedId ? JSON.parse(authenticatedId) : "";
}

const getUsername = () => {
    const username = localStorage.getItem("username");
    return username ? JSON.parse(username) : "";
}

const getCart = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : "";
}

const getRole = () => {
    const role = localStorage.getItem("role");
    return role ? JSON.parse(role) : "";
}


// Context Function
export const AuthProvider = ({children}) => {
    const [currentAuthenticatedId, setCurrentAuthenticatedId] = useState(getAuthenticatedId);
    const [currentUsername, setCurrentUsername] = useState(getUsername);;
    const [currentCart, setCurrentCart] = useState(getCart);
    const [currentRole, setCurrentRole] = useState(getRole);


    useEffect(() => {
        localStorage.setItem("authenticatedId", JSON.stringify(currentAuthenticatedId));
        localStorage.setItem("username", JSON.stringify(currentUsername));
        localStorage.setItem("cart", JSON.stringify(currentCart));
        localStorage.setItem("role", JSON.stringify(currentRole));
    }, [currentAuthenticatedId, currentUsername, currentCart, currentRole]);

    return (
        <AuthContext.Provider value={{currentAuthenticatedId, setCurrentAuthenticatedId, currentUsername, 
        setCurrentUsername, currentCart, setCurrentCart, 
        currentRole, setCurrentRole}}>
            {children}
        </AuthContext.Provider>
    )
}