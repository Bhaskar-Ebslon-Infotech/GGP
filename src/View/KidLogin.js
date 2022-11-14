import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LoginHeader from '../Component/LoginHeader';
import { Colors, Typography } from '../Styles/theme/index';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import commonStyle from '../Styles/commonStyle';

export default function KidLogin(props) {
    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <LoginHeader />
            <View style={{ position: 'relative', height: hp(90), width: '100%' }}>
                <Image source={require('../images/loginTopWave.png')} resizeMode='cover' style={[styles.top]} />
                <Text style={[styles.txt]}>I am Kid</Text>
                <View style={[commonStyle.flexRow,]}>
                    <Image source={require('../images/pigDoor.png')} resizeMode='cover' style={[styles.door]} />
                    <TouchableOpacity onPress={() => { props.navigation.navigate('KidWelcome') }}>
                        <Image source={require('../images/click.png')} resizeMode='cover' style={[styles.click]} />
                    </TouchableOpacity>
                </View>
                <Image source={require('../images/bottomTopWave.png')} resizeMode='cover' style={[styles.bottom]} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    top: {
        height: hp(18),
        width: '100%',
        position: 'absolute',
        top: 0
    },
    bottom: {
        height: hp(18),
        width: '100%',
        position: 'absolute',
        bottom: 0
    },
    door: {
        height: hp(40),
        width: wp(79),
        position: 'absolute',
        top: hp(30.5)
    },
    click: {
        height: hp(17),
        width: wp(31.7),
        position: 'absolute',
        right: hp(8),
        top: hp(26)
    },
    txt: {
        color: '#353535',
        fontFamily: 'Cookies',
        fontSize: Typography.FONT_SIZE_22,
        position: 'absolute',
        alignSelf: 'center',
        top: hp(20),
        borderBottomWidth: 4,
        lineHeight: Typography.FONT_SIZE_20,
        borderColor: '#EC892B'
    }
})