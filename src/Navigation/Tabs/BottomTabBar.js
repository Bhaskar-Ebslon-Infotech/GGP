import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import Back from '../../images/svg/parentsvg/back';
import Home from '../../images/svg/homeBtn';
import Net from '../../images/svg/parentsvg/report';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { Colors } from '../../Styles/theme/index';

import ReportStack from '../stacks/ReportStack';
import MissionVideoStack from '../stacks/MissionVideoStack';
import SettingStack from '../stacks/SettingStack'
import ShopStack from '../stacks/ShopStack';
import WalletStack from '../stacks/WalletStack';
import Plans from '../../View/Plans'
import Notification from '../../View/Parent/Notification';
import MyDrawer from '../Drawer';


const Tab = createBottomTabNavigator();


const CustomBottomTabContent = () => {

    const navigation = useNavigation();
    return (
        <View style={[styles.bottomView]}>
            <TouchableOpacity onPress={() => navigation.navigate('MyDrawer', { screen: "DashboardStack", params: { screen: "Dashboard" } })}><Home height={hp(4)} width={wp(7)} /></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ReportStack')}><Net height={hp(4)} width={wp(7)} /></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Notification')}><FontAwesome name='bell' size={25} color={'#323232'} /></TouchableOpacity>
        </View>
    )
}


export default function BottomTabBar(props) {
    return (
        <Tab.Navigator initialRouteName='MyDrawer' tabBar={(props) => <CustomBottomTabContent />}>
            <Tab.Screen name="MyDrawer" options={{ headerShown: false, }} component={MyDrawer} />
            <Tab.Screen name="ReportStack" options={{ headerShown: false, }} component={ReportStack} />
            <Tab.Screen name="Notification" options={{ headerShown: false, }} component={Notification} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    bottomView: {
        backgroundColor: Colors.WHITE,
        borderTopWidth: 1,
        borderColor: '#EAEAEA',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    }
})