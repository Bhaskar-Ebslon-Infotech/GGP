import { useIsFocused } from '@react-navigation/native';
import React, { useContext } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LoginHeader from '../Component/LoginHeader';
import commonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';

export default function LoginOption(props) {
    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <ImageBackground source={require('../images/log.png')} style={[commonStyle.fullSize]}>
                <LoginHeader />
                <View style={[styles.view]}>
                    <Text style={[styles.title]}>I am a</Text>
                    <TouchableOpacity onPress={() => { props.navigation.navigate('KidLogin') }} style={[styles.bg, { marginTop: Spacing.MARGIN_40 }]}>
                        <Text style={[styles.text, { color: Colors.WHITE }]}>Kid</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.bg1, { marginTop: Spacing.MARGIN_25 }]} onPress={() => props.navigation.navigate("LoginParent")}>
                        <Text style={[styles.text, { color: Colors.PRIMARY }]}>Parent</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        marginTop: hp(47)
    },
    title: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_30,
        color: Colors.WHITE
    },
    bg: {
        borderWidth: 2,
        borderColor: Colors.WHITE,
        width: '60%',
        borderRadius: 20
    },
    bg1: {
        backgroundColor: Colors.WHITE,
        width: '60%',
        borderRadius: 20
    },
    text: {
        fontSize: 15,
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
        paddingVertical: Spacing.PADDING_7
    }
})