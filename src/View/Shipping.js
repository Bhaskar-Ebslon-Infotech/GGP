import React from 'react'
import { View, Text, ImageBackground, StyleSheet, Image, FlatList } from 'react-native';
import commonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ship from '../images/svg/shippingBG';
export default function Shipping() {
    const data = [
        {
            id: '1',
            title: 'Color Pencil',
            leftRupee: '55 INR',
            img: require('../images/cross.png'),
            status: 'To Ship',
            borderColor: Colors.SECONDARY
        },
        {
            id: '2',
            title: 'Color Pencil',
            leftRupee: '55 INR',
            img: require('../images/cross.png'),
            status: 'To Ship',
            borderColor: Colors.GRADIENT2
        },
        {
            id: '3',
            title: 'Color Pencil',
            leftRupee: '55 INR',
            img: require('../images/cross.png'),
            status: 'To Ship',
            borderColor: Colors.PRIMARY
        },

    ]

    const renderItem = ({ item }) => {
        return (
            // <View style={[styles.listMainView, { borderColor: item.borderColor }]}>
            // <View style={[commonStyle.flexRow, { justifyContent: 'space-between' }]}>
            //     <Text style={[styles.listTitle]}>{item.title}</Text>
            //     <Image source={item.img} resizeMode='cover' style={[styles.listImg]} />
            // </View>
            // <View style={[commonStyle.flexRow, { justifyContent: 'space-between', marginTop: Spacing.PADDING_5 }]}>
            //     <Text style={[styles.inr]}>{item.leftRupee}</Text>
            //     <Text style={[styles.inr]}>{item.status}</Text>
            // </View>
            // </View>
            <View style={[styles.listMainView, { borderColor: item.borderColor }]}>
                <View style={[commonStyle.flexRow, { justifyContent: 'space-between', }]}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={[styles.listTitle]}>{item.title}</Text>
                        <Text style={[styles.inr]}>{item.leftRupee}</Text>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <Image source={item.img} resizeMode='cover' style={[styles.listImg]} />
                        <Text style={[styles.inr, { fontSize: Typography.FONT_SIZE_12, color: Colors.LIGHT_BLACK, marginTop: Spacing.MARGIN_5 }]}>{item.status}</Text>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <View>
            {/* <ImageBackground source={require('../images/shippingBg.png')} style={[commonStyle.fullSize]}> */}
            {/* <Header  /> */}
            <Ship height={hp('100%')} width={'100%'} style={{ position: 'absolute', top: hp(6) }} />
            <View style={{ paddingHorizontal: Spacing.MARGIN_20 }}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    ListHeaderComponent={
                        <>
                            <Text style={[commonStyle.title, { color: Colors.PRIMARY, marginTop: Spacing.MARGIN_70, marginBottom: Spacing.MARGIN_40 }]}>Shipping{' '}<Image source={require('../images/truck.png')} style={[styles.truck]} /></Text>
                        </>
                    }
                    keyExtractor={(item, index) => index}
                />
            </View>

            {/* </ImageBackground> */}
        </View>
    )
}
const styles = StyleSheet.create({
    truck: {
        height: hp(5),
        width: wp(8)
    },

    listMainView: {
        padding: Spacing.PADDING_7,
        borderWidth: 2,
        borderRadius: 15,
        marginTop: Spacing.MARGIN_15,
        backgroundColor: '#F2F4F6'
    },
    listTitle: {
        fontFamily: 'MontserratH3-SemiBold',
        fontSize: Typography.FONT_SIZE_20,
        color: '#747474',
        fontWeight: '700',
    },
    listImg: {
        height: hp(5),
        width: wp(9),
        alignSelf: 'flex-end'
    },
    inr: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.PRIMARY,
        fontWeight: '500',
        alignItems: 'center'
    },

})