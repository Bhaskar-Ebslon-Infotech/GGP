import React from 'react'
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Report from '../../View/Parent/Report';
import InProgress from '../../View/Parent/InProgress';
import Complete from '../../View/Parent/Complete';
import VideoProgress from '../../View/Parent/VideoProgress';
import VideoComplete from '../../View/Parent/VideoComplete';
import Blessing from '../../View/Parent/Blessing';
import OrderedProduct from '../../View/Parent/OrderedProduct';
import InCart from '../../View/Parent/InCart';
export default function ReportStack() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator initialRouteName='Report'>
            <Stack.Screen options={{ headerShown: false }} name="Report" component={Report} />
            <Stack.Screen options={{ headerShown: false }} name="InProgress" component={InProgress} />
            <Stack.Screen options={{ headerShown: false }} name="Complete" component={Complete} />
            <Stack.Screen options={{ headerShown: false }} name="VideoProgress" component={VideoProgress} />
            <Stack.Screen options={{ headerShown: false }} name="VideoComplete" component={VideoComplete} />
            <Stack.Screen options={{ headerShown: false }} name="Blessing" component={Blessing} />
            <Stack.Screen options={{ headerShown: false }} name="OrderedProduct" component={OrderedProduct} />
            <Stack.Screen options={{ headerShown: false }} name="InCart" component={InCart} />
        </Stack.Navigator>
    )
}