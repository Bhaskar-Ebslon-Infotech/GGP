import React, { createContext, useState } from 'react'
export const BackgroundImageValContext = createContext();
export function BackgroundImageValProvider({ children }) {
    const [backgroundImageVal, setBackgroundImageVal] = useState({
        id: 1,
        img: require('../images/kbg1.png'),
    });
    return (
        <BackgroundImageValContext.Provider value={[backgroundImageVal, setBackgroundImageVal]}>{children}</BackgroundImageValContext.Provider>
    )
}