import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import KidChangePin from '../../View/Parent/KidChangePin';
import KidReg from '../../View/Parent/KidReg';
import OtpVerifyPlansSelection from '../../View/Parent/OtpVerifyPlansSelection';
import ParentChangePin from '../../View/Parent/ParentChangePin';
import ParentPin from '../../View/Parent/ParentPin';
import PaymentAfterLogin from '../../View/Parent/PaymentAfterLogin';
import PlansAfterLogin from '../../View/Parent/PlansAfterLogin';
import Premium from '../../View/Parent/Premium';
import Pricing from '../../View/Parent/Pricing';
import ScreenTime from '../../View/Parent/ScreenTime';
import Settings from '../../View/Parent/Settings';
import ParentTimeOut from '../../View/Parent/ParentTimeOut';

export default function SettingStack() {

    const Stack = createStackNavigator();
    return (
        <Stack.Navigator >
            <Stack.Screen options={{ headerShown: false }} name="Settings" component={Settings} />
            <Stack.Screen options={{ headerShown: false }} name="ParentPin" component={ParentPin} />
            <Stack.Screen options={{ headerShown: false }} name="ParentChangePin" component={ParentChangePin} />
            <Stack.Screen options={{ headerShown: false }} name="KidChangePin" component={KidChangePin} />
            <Stack.Screen options={{ headerShown: false }} name="Pricing" component={Pricing} />
            <Stack.Screen options={{ headerShown: false }} name="Premium" component={Premium} />
            <Stack.Screen options={{ headerShown: false }} name="OtpVerifyPlansSelection" component={OtpVerifyPlansSelection} />
            <Stack.Screen options={{ headerShown: false }} name="PlansAfterLogin" component={PlansAfterLogin} />
            <Stack.Screen options={{ headerShown: false }} name="PaymentAfterLogin" component={PaymentAfterLogin} />
            <Stack.Screen options={{ headerShown: false }} name="ScreenTime" component={ScreenTime} />
            <Stack.Screen name="KidReg" options={{ headerShown: false, }} component={KidReg} />
            <Stack.Screen name="ParentTimeOut" options={{ headerShown: false, }} component={ParentTimeOut} />
        </Stack.Navigator>
    )
}
