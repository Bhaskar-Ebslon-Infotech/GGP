import React, { createContext, useState } from 'react'
export const authContext = createContext();
export function AuthContextProvider({ children }) {
    const [isAuthorised, setIsAuthorised] = useState(false);
    return (
        <authContext.Provider value={[isAuthorised, setIsAuthorised]}>{children}</authContext.Provider>
    )
}