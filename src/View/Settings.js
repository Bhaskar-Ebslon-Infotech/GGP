import React, { useContext } from 'react';
import { View, Text, ImageBackground, StyleSheet, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { Colors, Spacing, Typography, Mixins, } from '../Styles/theme/index';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CommonStyle from '../Styles/commonStyle';
import Profile from '../images/svg/profile'
import { images } from '../Constant/background';
import Teady from '../images/svg/teady';
import { removeAuthToken, removeFavcyAuthToken, removePhoneNumber } from '../api/user';
import { authContext } from '../Context/AuthContext';
import { RoleContext } from '../Context/RoleContext';

export default function Personal(props) {
    const [isAuthorised, setIsAuthorised] = useContext(authContext);
    const [role, setRole] = useContext(RoleContext);

    const logoutKid = async () => {
        await removeFavcyAuthToken();
        await removeAuthToken();
        await removePhoneNumber();
        setRole("");
        setIsAuthorised(false);
        // props.navigation.navigate('Login');
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
                        logoutKid()
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
    const navigation = useNavigation();
    return (
        <View>
            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[CommonStyle.fullSize]} >
                <ImageBackground source={images.backGround} style={[CommonStyle.fullSize]}>
                    <View style={[styles.view]}>
                        <Text style={[CommonStyle.title]}>Settings</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('PersonalKid')} style={[styles.inputView, { marginTop: Spacing.MARGIN_30 }]}>
                            <Profile height={hp(5)} width={wp(8)} />
                            <Text style={[styles.btnText]}>My Account</Text>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Backgrounds')} style={[styles.inputView, { marginTop: Spacing.MARGIN_10, paddingVertical: Spacing.PADDING_10 }]}>
                            {/* <Profile height={hp(5)} width={wp(8)} /> */}
                            <Text style={[styles.btnText, { width: '100%' }]}>Backgrounds</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => showAlert()} style={[styles.inputView, { marginTop: Spacing.MARGIN_10, paddingVertical: Spacing.PADDING_10 }]}>
                            {/* <Profile height={hp(5)} width={wp(8)} /> */}
                            <Text style={[styles.btnText, { width: '100%' }]}>Logout </Text>
                        </TouchableOpacity>
                    </View>
                    <Teady height={hp(30)} width={wp(80)} style={[styles.bottomImg]} />
                    {/* <Image source={require('../images/teady.png')} resizeMode='contain' style={[styles.bottomImg]} /> */}
                </ImageBackground>
            </LinearGradient>
        </View >
    )
}
const styles = StyleSheet.create({
    view: {
        paddingHorizontal: Spacing.PADDING_35,
        marginTop: Spacing.SIZE_220
    },
    inputView: {
        backgroundColor: Colors.WHITE,
        borderRadius: 30,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.PADDING_25,
        paddingVertical: Spacing.PADDING_5
    },
    btnText: {
        fontFamily: 'Cookies',
        fontSize: Typography.FONT_SIZE_20,
        color: Colors.SECONDARY,
        textAlign: 'center',
        width: '80%'
    },
    bottomImg: {
        // height: hp(37),
        // width: wp(52),
        position: 'absolute',
        // bottom: -hp(6),
        right: -hp(3),
        bottom: hp(3)
    }
})