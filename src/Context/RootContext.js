import React from "react";
import { LoggedInUserProvider } from "./LoggedInUserContext";
import { KidContextProvider } from "./CurrentKidContext";
import { AuthContextProvider } from "./AuthContext";
import { RoleContextProvider } from "./RoleContext";
import { BackgroundImageValProvider } from "./BackgroundContext";
import { SelectedDiscountCouponProvider } from "./SelectedDiscountCoupon";

export function RootProvider({ children }) {
    return (
        <AuthContextProvider>
            <RoleContextProvider>
                <LoggedInUserProvider>
                    <KidContextProvider>
                        <BackgroundImageValProvider>
                            <SelectedDiscountCouponProvider>
                                {children}
                            </SelectedDiscountCouponProvider>
                        </BackgroundImageValProvider>
                    </KidContextProvider>
                </LoggedInUserProvider>
            </RoleContextProvider>
        </AuthContextProvider>
    )
}

