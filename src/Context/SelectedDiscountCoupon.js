import React, { createContext, useState } from 'react'
export const SelectedDiscountCouponContext = createContext();
export function SelectedDiscountCouponProvider({ children }) {
    const [selectedDiscountCoupon, setSelectedDiscountCoupon] = useState({});
    return (
        <SelectedDiscountCouponContext.Provider value={[selectedDiscountCoupon, setSelectedDiscountCoupon]}>{children}</SelectedDiscountCouponContext.Provider>
    )
}