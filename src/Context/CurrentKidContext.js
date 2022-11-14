import React, { createContext, useState } from 'react'
export const kidContext = createContext();
export function KidContextProvider({ children }) {
    const [currentKid, setCurrentKid] = useState(false);
    return (
        <kidContext.Provider value={[currentKid, setCurrentKid]}>{children}</kidContext.Provider>
    )
}