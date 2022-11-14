import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Home from '../../images/svg/homeBtn';
import Back from '../../images/svg/parentsvg/back';
import { Colors } from '../../Styles/theme/index';
import { StackActions } from '@react-navigation/native';
import KidDashBoardStack from '../stacks/KidStacks/KidDashBoardStack';


const Tab = createBottomTabNavigator();


const CustomBottomTabContent = (props) => {

    const navigation = useNavigation();
    const handleNavigateBack=()=>{
            navigation.goBack()    
    }
    return (
        <View style={[styles.bottomView]}>
            <TouchableOpacity onPress={() => navigation.dispatch(StackActions.popToTop())}><Home height={hp(4)} width={wp(7)} /></TouchableOpacity>
            <TouchableOpacity onPress={() => {  handleNavigateBack() }}><Back height={hp(4)} width={wp(7)} /></TouchableOpacity>
        </View >
    )
}


export default function BottomTabBar(props) {
    return (
        <Tab.Navigator tabBar={(props) => <CustomBottomTabContent rootProps={props}/>}>
            {/* <Tab.Screen options={{ headerShown: false }} name="KidInnerStack" component={KidInnerStack} /> */}
            <Tab.Screen options={{ headerShown: false }} name="KidDashBoardStack" component={KidDashBoardStack} />
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