import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import commonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';
import LinearGradient from 'react-native-linear-gradient';
import Pay from '../images/svg/pay';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

export default function AskBlessing() {
    const navigation= useNavigation();
    return (
        <ScrollView>
            <Text style={[commonStyle.title, { color: Colors.PRIMARY, marginTop: Spacing.MARGIN_50 }]}>AskBlessing</Text>
            <View style={{ paddingHorizontal: Spacing.MARGIN_20 }}>
                <Text style={[styles.lable]}>Child’s name</Text>
                <TextInput placeholder='Enter child’s name' placeholderTextColor='#BFBFBF' style={[styles.input]} />
                <Text style={[styles.lable]}>Your name</Text>
                <TextInput placeholder='Enter your name' placeholderTextColor='#BFBFBF' style={[styles.input]} />
                <Text style={[styles.lable]}>Amount</Text>
                <TextInput placeholder='Enter amount to bless' placeholderTextColor='#BFBFBF' style={[styles.input]} />
                <TouchableOpacity onPress={()=>navigation.navigate('PiggyBank')} style={{ paddingHorizontal: Spacing.PADDING_25, marginTop: Spacing.MARGIN_60 }}>
                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn]} >
                        <View style={[styles.btnView]}>
                            <Text style={[styles.btnText]}>Pay using</Text>
                            <Pay height={hp(5)} width={wp(30)} />
                        </View>
                    </LinearGradient>
                </TouchableOpacity>

                <View style={[styles.imgView]}>
                    <ImageBackground source={require('../images/askBlessing.png')} resizeMode='stretch' style={[styles.img]} >
                        <View style={[styles.askView]}>
                            <Text style={[styles.askText]}>[Kid Name] is asking for your blessing for savings</Text>
                        </View>
                    </ImageBackground>
                </View>


            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    lable: {
        fontFamily: 'Montserrat-Regular',
        fontSize: Typography.FONT_SIZE_16,
        fontWeight: '500',
        color: '#747474',
        marginTop: Spacing.MARGIN_30
    },
    input: {
        borderWidth: 1,
        borderColor: '#9A9A9A',
        paddingHorizontal: Spacing.MARGIN_20,
        borderRadius: 30,
        marginTop: Spacing.MARGIN_5,
    },
    linearBtn: {
        height: Spacing.SIZE_50,
        borderRadius: 30,
        padding: Spacing.PADDING_2,
        paddingHorizontal: Spacing.PADDING_4
    },
    btnView: {
        backgroundColor: Colors.WHITE,
        height: "100%",
        width: "100%",
        borderRadius: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnText: {
        textAlign: 'center',
        color: Colors.PRIMARY,
        fontSize: Typography.FONT_SIZE_18,
        fontWeight: '600',
        fontFamily: 'Montserrat-SemiBold',
        marginRight: Spacing.MARGIN_10
    },
    imgView: {
        alignSelf: 'center',
        marginTop: Spacing.MARGIN_60,
        paddingHorizontal: Spacing.MARGIN_30,
        marginBottom: Spacing.MARGIN_20
    },
    img: {
        height: Spacing.SIZE_200,
        width: wp(95)
    },
    askView: {
        alignItems: 'flex-end',
        marginTop: Spacing.PADDING_25,

    },
    askText: {
        width: '40%',
        fontSize: Typography.FONT_SIZE_12,
        fontWeight: '600',
        fontFamily: 'Montserrat-SemiBold',
        color: '#747474',
        marginRight: Spacing.MARGIN_30
    }
})