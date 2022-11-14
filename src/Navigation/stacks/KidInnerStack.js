import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabBar from '../Tabs/BottomTabBar';

export default function KidInnerStack() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName='BottomTabBar'>
            <Stack.Screen name="BottomTabBar" options={{ headerShown: false }} component={BottomTabBar} />
            {/* <Stack.Screen options={{ headerShown: false }} name="Mission" component={Mission} /> */}
            {/* <Stack.Screen options={{ headerShown: false }} name="AddFrequency" component={AddFrequency} /> */}
            {/* <Stack.Screen options={{ headerShown: false }} name="MissionSummary" component={MissionSummary} /> */}
        </Stack.Navigator>
    )
}
