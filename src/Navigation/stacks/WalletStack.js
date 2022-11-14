import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MyWallet from '../../View/Parent/MyWallet';
import Share from '../../View/Parent/Share';
import TopUp from '../../View/Parent/TopUp';
import Wallet from '../../View/Parent/Wallet';
import WalletHistory from '../../View/Parent/WalletHistory';
import WalletCard from '../../View/Parent/WalletCard'

export default function WalletStack() {

    const Stack = createStackNavigator();
    return (
        <Stack.Navigator initialRouteName='Wallet'>
            <Stack.Screen options={{ headerShown: false }} name="Wallet" component={Wallet} />
            <Stack.Screen options={{ headerShown: false }} name="TopUp" component={TopUp} />
            <Stack.Screen options={{ headerShown: false }} name="WalletHistory" component={WalletHistory} />
            <Stack.Screen options={{ headerShown: false }} name="MyWallet" component={MyWallet} />
            <Stack.Screen options={{ headerShown: false }} name="Share" component={Share} />
            <Stack.Screen options={{ headerShown: false }} name="WalletCard" component={WalletCard} />

        </Stack.Navigator>
    )
}
