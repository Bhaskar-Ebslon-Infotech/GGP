import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../../View/Parent/Dashboard';
import WalletStack from './WalletStack';
import MissionVideoStack from './MissionVideoStack';
import ShopStack from './ShopStack';

export default function InnerDashboardStack() {

    const Stack = createStackNavigator();
    return (
        <Stack.Navigator initialRouteName='Dashboard'>
            <Stack.Screen name="Dashboard" options={{ headerShown: false }} component={Dashboard} />
            <Stack.Screen name="WalletStack" options={{ headerShown: false, }} component={WalletStack} />
            <Stack.Screen name="MissionVideoStack" options={{ headerShown: false, }} component={MissionVideoStack} />
            <Stack.Screen name="ShopStack" options={{ headerShown: false, }} component={ShopStack} />

            {/* <Stack.Screen options={{ headerShown: false }} name="Mission" component={Mission} /> */}
            {/* <Stack.Screen options={{ headerShown: false }} name="AddFrequency" component={AddFrequency} /> */}
            {/* <Stack.Screen options={{ headerShown: false }} name="MissionSummary" component={MissionSummary} /> */}
        </Stack.Navigator>
    )
}