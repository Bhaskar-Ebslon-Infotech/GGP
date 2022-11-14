import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert, Platform } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { authContext } from "../Context/AuthContext";
import { removeAuthToken, removeFavcyAuthToken, removePhoneNumber, removeRole, removeRoleString } from '../api/user';
import Back from '../images/svg/parentsvg/back';
import Settings from '../images/svg/parentsvg/drawerSettings';
import commonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';
import InnerDashboardStack from './stacks/InnerDashboardStack';
import SettingStack from './stacks/SettingStack';
import { RoleContext } from '../Context/RoleContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const handleMailRedirect = () => {
    if (Platform.OS === 'android') {
        Linking.openURL(`mailto:support@goodgoodpiggy.com?cc=&subject=&body=Please type your query here and we will get back to you within 48 hours.For urgent matters, please feel free to contact us on your dedicated Whatsapp.`)

    } else {
        Linking.openURL(`mailto:support@goodgoodpiggy.com?cc=?subject=&body=Please type your query here and we will get back to you within 48 hours.For urgent matters, please feel free to contact us on your dedicated Whatsapp.`)
    }
}

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
    const navigation = useNavigation();
    const [isAuthorised, setIsAuthorised] = useContext(authContext);
    const [role, setRole] = useContext(RoleContext);
    const logoutUser = async () => {
        setRole("")
        await removeRoleString();
        await removeFavcyAuthToken();
        await removeAuthToken();
        await removePhoneNumber();
        setIsAuthorised(false);
        props.navigation.navigate('Login');
    }



    const showAlert = () => {
        return Alert.alert(
            "Are your sure?",
            "Are you sure you want to logout?",
            [
                // The "Yes" button
                {
                    text: "Yes",
                    onPress: () => {
                        logoutUser()
                        // setShowBox(false);
                    },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "No",
                },
            ]
        );
    }
    return (
        <View {...props} style={{ flex: 1 }}>
            <View style={[styles.bg]}>
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
                    <Back height={hp(5)} width={wp(8)} />
                </TouchableOpacity>
            </View>
            <ScrollView style={{ padding: 20 }}>
                <TouchableOpacity style={[commonStyle.flexRow]} onPress={() => navigation.navigate('SettingStack', { screen: "Settings" })}>
                    <Settings height={hp(6)} width={wp(10)} style={{}} />
                    <Text style={[styles.text]}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleMailRedirect()} style={[commonStyle.flexRow, { marginTop: Spacing.MARGIN_15 }]}>
                    <AntDesign name='mail' size={30} color={Colors.PRIMARY} />
                    <Text style={[styles.text, { marginLeft: Spacing.MARGIN_15 }]}>Call Good Good Piggy Expert</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[commonStyle.flexRow]} onPress={() => navigation.navigate('BottomTabBar', {
                    screen: 'Notification',
                })
                }>
                    <FontAwesome name='bell' size={35} style={{ marginVertical: 10 }} color={Colors.GRADIENT1} />
                    <Text style={[styles.text]}>Notifications</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[commonStyle.flexRow, { marginTop: Spacing.MARGIN_15 }]} onPress={showAlert} >
                    <AntDesign name='logout' size={30} color={Colors.PRIMARY} />
                    <Text style={[styles.text, { marginLeft: Spacing.MARGIN_15 }]}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default function MyDrawer(props) {
    return (
        <Drawer.Navigator initialRouteName='DashboardStack' drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen options={{ headerShown: false }} name="DashboardStack" component={InnerDashboardStack} />
            <Drawer.Screen name="SettingStack" options={{ headerShown: false, }} component={SettingStack} />
        </Drawer.Navigator>
    );
}
const styles = StyleSheet.create({
    text: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: 'Montserrat-Regular',
        color: '#747474',
        marginLeft: Spacing.MARGIN_10
    },
    bg: {
        backgroundColor: Colors.WHITE,
        padding: Spacing.MARGIN_5,
        paddingHorizontal: Spacing.MARGIN_15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
})