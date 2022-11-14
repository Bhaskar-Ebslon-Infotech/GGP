import { View, Text } from 'react-native'
import React from 'react'
import Dashboard from '../../../View/Dashboard';
import { createStackNavigator } from '@react-navigation/stack';
import Award from '../../../View/Award';
import Backgrounds from '../../../View/Backgrounds';
import Blessing from '../../../View/Blessing';
import DailyMission from '../../../View/DailyMission';
import DailyVideo from '../../../View/DailyVideo';
import MissionBonus from '../../../View/MissionBonus';
import MissionStreak from '../../../View/MissionStreak';
import PlayList from '../../../View/PlayList';
import Settings from '../../../View/Settings';
import ShareAward from '../../../View/ShareAward';
import TimeOut from '../../../View/TimeOut';
import TodayMission from '../../../View/TodayMission';
import Vault from "../../../View/Vault"
import VideoList from '../../../View/VideoList';
import WatchVideo from '../../../View/WatchVideo';
import PiggyBank from "../../../View/PiggyBank"
import Shop from '../../../View/Shop';
import Shipping from '../../../View/Shipping';
import ProductDetails from '../../../View/ProductDetails';
import Goals from '../../../View/Goals';
// import Dashboard from '../../../View/Dashboard';
// import KidInnerStack from '../stacks/KidInnerStack';
export default function KidDashBoardStack() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator initialRouteName='Dashboard'>
            <Stack.Screen options={{ headerShown: false }} name="Dashboard" component={Dashboard} />
            <Stack.Screen options={{ headerShown: false }} name="Settings" component={Settings} />
            <Stack.Screen options={{ headerShown: false }} name="Backgrounds" component={Backgrounds} />
            <Stack.Screen options={{ headerShown: false }} name="Award" component={Award} />
            <Stack.Screen options={{ headerShown: false }} name="ShareAward" component={ShareAward} />
            <Stack.Screen options={{ headerShown: false }} name="Vault" component={Vault} />

            <Stack.Screen options={{ headerShown: false }} name="DailyMission" component={DailyMission} />
            <Stack.Screen options={{ headerShown: false }} name="MissionBonus" component={MissionBonus} />
            <Stack.Screen options={{ headerShown: false }} name="MissionStreak" component={MissionStreak} />
            <Stack.Screen options={{ headerShown: false }} name="TodayMission" component={TodayMission} />
            <Stack.Screen options={{ headerShown: false }} name="VideoList" component={VideoList} />
            <Stack.Screen options={{ headerShown: false }} name="WatchVideo" component={WatchVideo} />
            {/* <Stack.Screen options={{ headerShown: false }} name="TimeOut" component={TimeOut} /> */}
            <Stack.Screen options={{ headerShown: false }} name="PlayList" component={PlayList} />
            <Stack.Screen options={{ headerShown: false }} name="DailyVideo" component={DailyVideo} />
            <Stack.Screen options={{ headerShown: false }} name="Blessing" component={Blessing} />
            <Stack.Screen options={{ headerShown: false }} name="PiggyBank" component={PiggyBank} />
            <Stack.Screen options={{ headerShown: false }} name="Shop" component={Shop} />
            <Stack.Screen options={{ headerShown: false }} name="Shipping" component={Shipping} />
            <Stack.Screen options={{ headerShown: false }} name="ProductDetails" component={ProductDetails} />
            <Stack.Screen options={{ headerShown: false }} name="Goals" component={Goals} />
        </Stack.Navigator>
    )
}