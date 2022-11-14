import React from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import LoginHeader from '../Component/LoginHeader';
import Down from '../images/svg/dropDown';
import Flag from '../images/svg/flag';
import commonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';

export default function ParentForgetPin() {
    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <ImageBackground source={require('../images/shippingBg.png')} style={[commonStyle.fullSize]}>
                <LoginHeader />

                <View style={{ paddingHorizontal: Spacing.MARGIN_20 }}>
                    <Text style={[styles.title]}>Forget PIN</Text>
                    <Text style={[styles.label]}>Email Address</Text>
                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn, { height: hp(6.5), }]} >
                        <View style={[styles.btnView, { backgroundColor: Colors.WHITE, }]}>
                            <TextInput placeholder='Registered email address' style={{ paddingHorizontal: Spacing.MARGIN_15 }} />
                        </View>
                    </LinearGradient>
                    <Text style={[styles.label]}>PIN</Text>
                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn, { height: hp(6.5), }]} >
                        <View style={[styles.btnView, { backgroundColor: Colors.WHITE, }]}>
                            <View style={[commonStyle.flexRow, { paddingHorizontal: Spacing.MARGIN_15 }]}>
                                <Flag height={hp(3)} width={wp(5)} />
                                <TouchableOpacity>
                                    <Down height={hp(3)} width={wp(5)} style={{ marginHorizontal: Spacing.MARGIN_5 }} />
                                </TouchableOpacity>
                                <Text style={{ fontSize: Typography.FONT_SIZE_13, color: Colors.LIGHT_BLACK, fontFamily: 'Montserrat-Regular' }}>+91</Text>
                                <TextInput placeholder='Enter 4-digit PIN' keyboardType='numeric' style={{ paddingHorizontal: Spacing.MARGIN_5 }} />
                            </View>
                        </View>
                    </LinearGradient>

                    <View style={[commonStyle.flexRow, { alignSelf: 'center', marginTop: Spacing.MARGIN_15 }]}>
                        <TouchableOpacity onPress={() => console.log('hgj')} style={{ marginTop: Spacing.MARGIN_15, width: '100%' }}>
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn]} >
                                <View style={[styles.btnView]}>
                                    <Text style={[styles.btnText, { color: Colors.WHITE }]}>Send</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>



                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    linearBg: {
        //height:hp(35),
        width: '100%'
    },
    title: {
        color: Colors.WHITE,
        marginVertical: Spacing.MARGIN_30,
        fontSize: Typography.FONT_SIZE_25,
        width: '56%',
        alignSelf: 'center'
    },
    contain: {
        color: Colors.WHITE,
        fontSize: Typography.FONT_SIZE_15,
        width: '90%',
        fontFamily: 'Montserrat-Regular',
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: Spacing.MARGIN_10,
        marginBottom: Spacing.MARGIN_60
    },
    linearBtn: {
        height: hp(5),
        width: '100%',
        borderRadius: 30,
        paddingVertical: Spacing.PADDING_2,
        paddingHorizontal: Spacing.PADDING_2
    },
    btnView: {

        height: "100%",
        width: "100%",
        borderRadius: 20,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    btnText: {
        textAlign: 'center',
        color: Colors.PRIMARY,
        fontSize: Typography.FONT_SIZE_18,
        // fontWeight: '600',
        fontFamily: 'Montserrat-Regular',
        paddingHorizontal: Spacing.MARGIN_40,
    },
    label: {
        fontFamily: 'Montserrat-Regular',
        fontSize: Typography.FONT_SIZE_13,
        color: '#747474',
        marginTop: Spacing.MARGIN_18,
        marginBottom: Spacing.PADDING_2
    },
    title: {
        fontSize: Typography.FONT_SIZE_25,
        color: Colors.PRIMARY,
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
        marginBottom: Spacing.MARGIN_10,
        marginTop: Spacing.MARGIN_60,
    }
})
