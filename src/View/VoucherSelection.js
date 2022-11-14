import React from 'react'
import { View, Text, StyleSheet, FlatList, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import Header from '../Component/Header';
import commonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Dis from '../images/svg/discount';

export default function VoucherSelection() {
    const data = [
        {
            id: '1',
            brand: 'Brand X',
            inr: '30',
            desc: 'Any Purchase of 50 INR or More',
            valid: '01/01/2022',
        },
        {
            id: '2',
            brand: 'Brand X',
            inr: '30',
            desc: 'Any Purchase of 50 INR or More',
            valid: '01/01/2022',
        },

    ]
    const renderItem = ({ item }) => {
        return (
            <View style={[styles.listView]}>
                <ImageBackground source={require('../images/ticket.png')} resizeMode='contain' style={[styles.ticket]}>
                    <View style={[commonStyle.flexRow, { justifyContent: 'space-between', marginTop: -Spacing.MARGIN_10 }]}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={[styles.brand]}>{item.brand}</Text>
                            <Text style={[styles.brand]}>{item.inr} INR Off</Text>
                        </View>
                        <TouchableOpacity style={{ backgroundColor: Colors.WHITE, borderRadius: 5 }}>
                            <Text style={[styles.use]}>Use</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                <View style={{ paddingHorizontal: Spacing.MARGIN_10, paddingVertical: Spacing.MARGIN_10, }}>
                    <Text style={[styles.desc]}>{item.desc}</Text>
                    <Text style={[styles.desc]}>Valid Until {item.valid}</Text>
                </View>
            </View>
        )
    }
    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            {/* <Header /> */}

            <FlatList
                data={data}
                contentContainerStyle={{ paddingHorizontal: Spacing.MARGIN_15, paddingTop: Spacing.MARGIN_10, paddingBottom: Spacing.MARGIN_20 }}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
                ListHeaderComponent={
                    <View style={{ marginVertical: Spacing.MARGIN_20 }}>
                        <Text style={[styles.head]}>Voucher Selection</Text>
                        <View style={[commonStyle.flexRow, { marginTop: Spacing.MARGIN_10 }]}>
                            <TextInput placeholder='Type Code' style={[styles.input]} />
                            <TouchableOpacity style={{ width: '35%', marginLeft: Spacing.MARGIN_10 }}>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                    <View style={[styles.btnView, { width: '98%' }]}>
                                        <Text style={[commonStyle.btnText, { color: Colors.PRIMARY, paddingVertical: Spacing.MARGIN_5 }]}>Apply</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            />
        </View>
    )
}
const styles = StyleSheet.create({
    listView: {
        // borderWidth: 1,
        borderRadius: 5,
        borderColor: '#BFBFBF',
        backgroundColor: Colors.WHITE,
        marginTop: Spacing.MARGIN_10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6.84,

        elevation: 2,
    },
    ticket: {
        width: '100%',
        height: hp(10),
        paddingHorizontal: Spacing.MARGIN_10,
        justifyContent: 'center',

    },
    brand: {
        fontFamily: 'Montserrat-Regular',
        fontSize: Typography.FONT_SIZE_16,
        color: Colors.WHITE
    },
    use: {
        paddingHorizontal: Spacing.MARGIN_20,
        paddingVertical: Spacing.PADDING_2,
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.PRIMARY,
        fontFamily: 'Montserrat-Regular',
    },
    desc: {
        fontSize: Typography.FONT_SIZE_12,
        color: '#9A9A9A',
        fontFamily: 'Montserrat-Regular',
    },
    head: {
        fontSize: Typography.FONT_SIZE_20,
        fontFamily: 'Montserrat-SemiBold',
    },
    input: {
        borderWidth: 1,
        height: hp(5.5),
        borderRadius: 20,
        borderColor: '#9A9A9A',
        backgroundColor: Colors.WHITE,
        paddingHorizontal: Spacing.MARGIN_15,
        width: '63%',
    },
    btnView: {
        backgroundColor: Colors.WHITE,
        borderRadius: 25,
        alignSelf: 'center',
        justifyContent: 'center',
        margin: Spacing.PADDING_2,

    },
})