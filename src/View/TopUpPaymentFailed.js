import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, Spacing, Typography } from '../Styles/theme';
import LinearGradient from 'react-native-linear-gradient';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { AddMoneytoUserWallet, reduceMoneyFromUserWallet } from '../api/wallet';

export default function TopUpPaymentFailed(props) {
    const navigation = useNavigation();

    const focused = useIsFocused()

    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <ImageBackground source={require('../images/bg2.png')} resizeMode='cover' style={[{ flex: 1, minHeight: hp(100) }]}>
                <Image source={require('../images/forgetTeady.png')} resizeMode='contain' style={[styles.img]} />
                <View style={[styles.view]}>
                    <Text style={[styles.suc]}>Payment Failed</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("DashboardStack", { screen: "Drawer", params: { screen: "BottomTabBar", params: { screen: "WalletStack", params: { screen: "TopUp" } } } })} style={{ paddingHorizontal: Spacing.MARGIN_30, marginTop: Spacing.MARGIN_10, }}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={['red', 'red']} style={[styles.linearBtn, { borderRadius: 20 }]} >
                            <Text style={[styles.btnText]}>Go Back</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}
const styles = StyleSheet.create({
    img: {
        height: hp(35),
        width: wp(50),

        alignSelf: 'center',
        marginTop: hp(10)
    },
    view: {
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: -hp(10),
        backgroundColor: '#fff',
        marginHorizontal: 20,
        // height: hp(20),
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    suc: {
        fontSize: 22,
        fontFamily: 'Cookies',
        color: Colors.PRIMARY
    },
    linearBtn: {
        width: '100%',
        borderRadius: 7,
        marginTop: Spacing.PADDING_25,
    },
    btnText: {
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.WHITE,
        fontSize: Typography.FONT_SIZE_16,
        fontWeight: '600',
        paddingVertical: Spacing.PADDING_10,
        paddingHorizontal: 25
    },
})