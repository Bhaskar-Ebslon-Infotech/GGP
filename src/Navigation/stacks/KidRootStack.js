import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../../View/Dashboard';
import Settings from '../../View/Settings';
import Personal from '../../View/Settings';
import Backgrounds from '../../View/Backgrounds';
import Award from '../../View/Award';
import ShareAward from '../../View/ShareAward';
import Saved from "../../View/Saved"
import EnterPin from "../../View/EnterPin"
import TodayMission from "../../View/TodayMission"
import TodayMissionEdit from "../../View/TodayMissionEdit"
import VideoList from "../../View/VideoList"
import Goals from "../../View/Goals"
import ProductDetails from "../../View/ProductDetails"
import Blessing from "../../View/Blessing"
import BlessingCode from "../../View/BlessingCode"
import Shipping from "../../View/Shipping"
import Shop from "../../View/Shop"
import PiggyBank from "../../View/PiggyBank"
import AskBlessing from "../../View/AskBlessing"
import DailyVideo from "../../View/DailyVideo"
import TimeOut from "../../View/TimeOut"
import PlayList from "../../View/PlayList";
import KidIndivisualVideo from '../../View/KidIndivisualVideo';
import WatchVideo from "../../View/WatchVideo"
import DailyMission from "../../View/DailyMission"
import Vault from "../../View/Vault"
import MissionBonus from "../../View/MissionBonus"
import MissionStreak from "../../View/MissionStreak"
import KidRegister from "../../View/KidRegister";
import Transation from '../../View/Transation';
import KidBottomTabBar from '../Tabs/KidBottomTabBar';
import PersonalKid from '../../View/Personal';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { getTimeOut } from '../../api/timeOut';

export default function KidRootStack() {
    const Stack = createStackNavigator();
    const focused = useIsFocused()
    const [timeOutMin, setTimeOutMin] = useState('');
    const navigation = useNavigation()
    const getKidTimeOut = async () => {
        try {
            let { data: res } = await getTimeOut()
            if (res.data) {
                if (res.data.isActive) {
                    console.log("active")
                    setTimeOutMin(res.data.time)
                    timer(res.data.time)
                }

                // console.log("Inactive")
            }
        }
        catch (error) {
            if (error?.response.data.message) {
                //console.error(error.response.data.message)
            } else {
                //console.error(error.message)
            }
        }
    }

    const timer = (time) => {
        setTimeout(() => {
            console.log("asdsaasdsd")
            navigation.navigate('TimeOut', { data: timeOutMin })
        }, time * 60000);
    }

    useEffect(() => {
        if (focused) {
            getKidTimeOut()
        }
    }, [focused])
    return (
        <Stack.Navigator initialRouteName='Dashboard'>
            <Stack.Screen options={{ headerShown: false }} name="KidBottomTabBar" component={KidBottomTabBar} />
            {/* <Stack.Screen options={{ headerShown: false }} name="Dashboard" component={Dashboard} /> */}
            {/* <Stack.Screen options={{ headerShown: false }} name="Settings" component={Settings} /> */}
            <Stack.Screen options={{ headerShown: false }} name="PersonalKid" component={PersonalKid} />
            {/* <Stack.Screen options={{ headerShown: false }} name="Backgrounds" component={Backgrounds} /> */}
            {/* <Stack.Screen options={{ headerShown: false }} name="Award" component={Award} /> */}
            {/* <Stack.Screen options={{ headerShown: false }} name="ShareAward" component={ShareAward} /> */}
            <Stack.Screen options={{ headerShown: false }} name="Saved" component={Saved} />
            <Stack.Screen options={{ headerShown: false }} name="EnterPin" component={EnterPin} />
            <Stack.Screen options={{ headerShown: false }} name="TodayMission" component={TodayMission} />
            <Stack.Screen options={{ headerShown: false }} name="TodayMissionEdit" component={TodayMissionEdit} />
            {/* <Stack.Screen options={{ headerShown: false }} name="VideoList" component={VideoList} /> */}
            {/* <Stack.Screen options={{ headerShown: false }} name="Goals" component={Goals} /> */}
            {/* <Stack.Screen options={{ headerShown: false }} name="ProductDetails" component={ProductDetails} /> */}
            <Stack.Screen options={{ headerShown: false }} name="Blessing" component={Blessing} />
            <Stack.Screen options={{ headerShown: false }} name="BlessingCode" component={BlessingCode} />
            {/* <Stack.Screen options={{ headerShown: false }} name="Shipping" component={Shipping} /> */}
            {/* <Stack.Screen options={{ headerShown: false }} name="Shop" component={Shop} /> */}
            <Stack.Screen options={{ headerShown: false }} name="PiggyBank" component={PiggyBank} />
            <Stack.Screen options={{ headerShown: false }} name="Transation" component={Transation} />
            <Stack.Screen options={{ headerShown: false }} name="AskBlessing" component={AskBlessing} />
            {/* <Stack.Screen options={{ headerShown: false }} name="DailyVideo" component={DailyVideo} /> */}
            <Stack.Screen options={{ headerShown: false }} name="TimeOut" component={TimeOut} />
            {/* <Stack.Screen options={{ headerShown: false }} name="PlayList" component={PlayList} /> */}
            <Stack.Screen options={{ headerShown: false }} name="KidIndivisualVideo" component={KidIndivisualVideo} />
            {/* <Stack.Screen options={{ headerShown: false }} name="WatchVideo" component={WatchVideo} /> */}
            {/* <Stack.Screen options={{ headerShown: false }} name="DailyMission" component={DailyMission} /> */}
            {/* <Stack.Screen options={{ headerShown: false }} name="Vault" component={Vault} /> */}
            {/* <Stack.Screen options={{ headerShown: false }} name="MissionBonus" component={MissionBonus} /> */}
            {/* <Stack.Screen options={{ headerShown: false }} name="MissionStreak" component={MissionStreak} /> */}
            <Stack.Screen options={{ headerShown: false }} name="KidRegister" component={KidRegister} />

        </Stack.Navigator>
    )
}