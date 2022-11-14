import React, { createContext, useState } from 'react'
export const RoleContext = createContext();
export function RoleContextProvider({ children }) {
    const [role, setRole] = useState("");
    return (
        <RoleContext.Provider value={[role, setRole]}>{children}</RoleContext.Provider>
    )
}