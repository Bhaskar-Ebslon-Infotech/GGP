import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Down from '../images/svg/dropDown';
import Flag from '../images/svg/flag';
import commonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';

export default function ParentPin() {
    return (
        <ScrollView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <ImageBackground source={require('../images/pigBg.png')} style={[commonStyle.fullSize]}>
                {/* <Header  /> */}
                <View style={{ padding: Spacing.PADDING_20 }}>
                    <Text style={[styles.heading]}>Parent</Text>
                    <Text style={[styles.label]}>Name:</Text>
                    <TextInput placeholder='enter name' style={[styles.input]} />
                    <Text style={[styles.label]}>Phone:</Text>
                    <View style={[commonStyle.flexRow, styles.input]}>
                        <Flag height={hp(3)} width={wp(5)} />
                        <TouchableOpacity><Down height={hp(3)} width={wp(5)} style={{ marginHorizontal: Spacing.MARGIN_5 }} /></TouchableOpacity>
                        <Text style={{ fontSize: Typography.FONT_SIZE_13, color: Colors.LIGHT_BLACK, fontFamily: 'Montserrat-Regular' }}>+91</Text>
                        <TextInput />
                    </View>
                    <Text style={[styles.label]}>Email:</Text>
                    <TextInput placeholder='enter name' style={[styles.input]} />
                    <Text style={[styles.label]}>PIN:</Text>
                    <TextInput placeholder='enter name' style={[styles.input]} />
                    <TouchableOpacity>
                        <Text style={[styles.text]}>Change PIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: Spacing.MARGIN_30 }} onPress={() => SetChangePinModal(true)}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                            <Text style={[commonStyle.btnText]}>Update</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

            </ImageBackground>

        </ScrollView>
    )
}
const styles = StyleSheet.create({
    heading: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_22,
        color: Colors.LIGHT_BLACK,
        marginTop: Spacing.MARGIN_15
    },
    label: {
        fontFamily: 'Montserrat-Regular',
        fontSize: Typography.FONT_SIZE_12,
        color: '#747474',
        marginTop: Spacing.MARGIN_10,
        marginBottom: Spacing.PADDING_4
    },
    input: {
        borderWidth: 1,
        height: hp(5.5),
        borderRadius: 20,
        borderColor: '#9A9A9A',
        backgroundColor: Colors.WHITE,
        paddingHorizontal: Spacing.MARGIN_15
    },
    text: {
        fontFamily: 'Montserrat-Regular',
        fontSize: Typography.FONT_SIZE_13,
        color: Colors.PRIMARY,
        marginTop: Spacing.PADDING_4,
    }
})