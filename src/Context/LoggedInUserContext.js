import React, { createContext, useState } from 'react'
export const LoggedInUser = createContext();
export function LoggedInUserProvider({ children }) {
    const [loggedInUser, setLoggedInUser] = useState("");
    return (
        <LoggedInUser.Provider value={[loggedInUser, setLoggedInUser]}>{children}</LoggedInUser.Provider>
    )
}
