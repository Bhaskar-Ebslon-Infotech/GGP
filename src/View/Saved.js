import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { images } from '../Constant/background';
import Home from '../images/svg/home';
import CommonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme/index';
import Teady from '../images/svg/teady';
export default function Saved() {
    const navigation = useNavigation();
    return (
        <View style={{ backgroundColor: "white" }}>
                  <Teady  height={hp(40)}    width={wp(60)}  style={[styles.teady]}/>
            {/* <Image source={require('../images/teady.png')} resizeMode='contain' style={[styles.teady]} /> */}
            <ImageBackground source={require('../images/personal.png')} resizeMode='stretch' style={[styles.bottomImg]}>
                <ImageBackground source={images.backGround} style={[CommonStyle.fullSize]}>
                <View style={[styles.View]}>
                        <Text style={[CommonStyle.title]}>Saved</Text>


                        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={{ backgroundColor: Colors.WHITE, paddingVertical: Spacing.PADDING_5, borderRadius: 20, marginTop: Spacing.SIZE_30 }}>
                            <View style={[CommonStyle.flexRow, { alignSelf: 'center' }]}>
                                <Text style={[styles.btnText]}>Dashboard</Text>
                                <Home height={hp(5)} width={wp(8)} style={{ borderRadius: 20, marginLeft: Spacing.PADDING_15 }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomImg: {

        width: '100%',
        position: 'absolute',
        top: hp(35)
        // marginTop: Spacing.SIZE_230
    },
    teady: {
        // height: hp(35),
        // width: wp(50),
        position: 'absolute',
        right: hp(13),
        top: hp(14),
    },
    View: {
        marginTop: hp(20),
        paddingHorizontal: Spacing.PADDING_20
    },
    btnText: {
        textAlign: 'center',
        color: Colors.PRIMARY,
        fontSize: Typography.FONT_SIZE_18,
        paddingVertical: Spacing.PADDING_5,
        fontWeight: '600',
        fontFamily: 'Montserrat-SemiBold'
    },
    label: {
        color: Colors.WHITE,
        fontSize: Typography.FONT_SIZE_14,
        paddingVertical: Spacing.PADDING_5,
        fontWeight: '500',
        fontFamily: 'Montserrat-Regular'
    },
    TextInput: {
        backgroundColor: Colors.WHITE,
        borderRadius: 25,
        paddingHorizontal: Spacing.PADDING_20
    },
    select: {
        backgroundColor: Colors.WHITE,
        width: '100%',
        borderRadius: 25,
    },
    text: {
        color: '#BFBFBF',
        fontSize: Typography.FONT_SIZE_14,
        paddingVertical: Spacing.PADDING_5,
        fontWeight: '500',
        fontFamily: 'Montserrat-Regular',
        marginLeft: Spacing.PADDING_15,
        flex: 1
    }
})