import React from 'react'
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import commonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';
import Clock from '../images/svg/clock';
import CountDown from 'react-native-countdown-component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

export default function TimeOut(props) {
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => navigation.goBack()}>
            <Text style={[commonStyle.title, { color: Colors.PRIMARY, marginTop: Spacing.SIZE_100 }]}>Timeout!</Text>
            <Text style={[styles.text]}>Take a break, stretch and walk.</Text>
            <Image source={require('../images/boy.png')} resizeMode='contain' style={[styles.img]} />
            <View style={[commonStyle.flexRow, { alignSelf: 'center', marginTop: Spacing.MARGIN_30 }]}>
                <Clock height={hp(5)} width={wp(8)} style={{ marginRight: Spacing.MARGIN_10 }} />
                <CountDown
                    until={props.route.params.data}
                    digitStyle={{ color: '#fff' }}
                    digitTxtStyle={{ color: Colors.PRIMARY, fontFamily: 'Cookies', fontSize: Typography.FONT_SIZE_18 }}
                    timeToShow={['M', 'S']}
                    timeLabels={{ m: '', s: '' }}
                />
            </View>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        width: '40%',
        alignSelf: 'center',
        fontFamily: 'Montserrat-SemiBold',
        fontWeight: '600',
        fontSize: Typography.FONT_SIZE_16,
        color: '#EE2727',
        marginTop: Spacing.PADDING_7
    },
    img: {
        alignSelf: 'center',
        height: hp(45),
        width: wp(62),
        marginTop: Spacing.MARGIN_80
    },
    time: {
        color: '#EE2727',
        fontSize: Typography.FONT_SIZE_18
    }
})