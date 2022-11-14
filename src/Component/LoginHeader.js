import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Back from '../images/svg/parentsvg/back';
import Logo from '../images/svg/logo';
import commonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';

export default function Header() {
    const navigation = useNavigation();
    return (
        <View style={[styles.bg]}>
            <View style={[commonStyle.flexRow, { justifyContent: 'space-between' }]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Back height={hp(5)} width={wp(8)} />
                </TouchableOpacity>
                <Logo height={hp(6)} width={wp(10)} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
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
    mainView: {
        backgroundColor: Colors.SECONDARY,
        height: hp(6),
        width: wp(11),
        borderRadius: 40,
        padding: Spacing.MARGIN_5,
    },
    view: {
        backgroundColor: Colors.PRIMARY,
        height: '100%',
        width: '100%',
        borderRadius: 30,
        borderColor: Colors.WHITE,
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: Typography.FONT_SIZE_15,
        fontFamily: 'Cookies',
        color: Colors.WHITE
    }
})