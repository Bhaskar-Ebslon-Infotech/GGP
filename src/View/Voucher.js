import React from 'react'
import { View, Text, StyleSheet, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import Header from '../Component/Header';
import commonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Dis from '../images/svg/discount';

export default function Voucher() {
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
        {
            id: '3',
            brand: 'Brand X',
            inr: '30',
            desc: 'Any Purchase of 50 INR or More',
            valid: '01/01/2022',
        },
        {
            id: '4',
            brand: 'Brand X',
            inr: '30',
            desc: 'Any Purchase of 50 INR or More',
            valid: '01/01/2022',
        },
        {
            id: '5',
            brand: 'Brand X',
            inr: '30',
            desc: 'Any Purchase of 50 INR or More',
            valid: '01/01/2022',
        }
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
                    <View style={[commonStyle.flexRow, { alignSelf: 'center', marginVertical: Spacing.MARGIN_10 }]}>
                        <Dis height={hp(4)} width={wp(7)} />
                        <Text style={{ fontSize: Typography.FONT_SIZE_22, color: Colors.PRIMARY, fontFamily: 'Montserrat-SemiBold', marginLeft: Spacing.MARGIN_5 }}>My Vouchers</Text>
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
    }
})